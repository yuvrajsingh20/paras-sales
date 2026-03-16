import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import twilio from 'twilio';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db';
import { generateToken, validateEmail, validatePhone } from '../utils/helpers';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const otpStore = new Map<string, { otp: string, expires: number }>();

export const googleAuth = async (req: Request, res: Response) => {
  const { credential } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid payload');

    const { sub: googleId, email, name } = payload;

    let result = await pool.query('SELECT * FROM users WHERE google_id = $1 OR email = $2', [googleId, email]);
    let user = result.rows[0];

    if (!user) {
      result = await pool.query(
        'INSERT INTO users (name, email, google_id, auth_provider) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, googleId, 'google']
      );
      user = result.rows[0];
    } else if (!user.google_id) {
      result = await pool.query(
        'UPDATE users SET google_id = $1, auth_provider = $2 WHERE id = $3 RETURNING *',
        [googleId, 'google', user.id]
      );
      user = result.rows[0];
    }

    const token = generateToken(user.id);
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: 'Google authentication failed' });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber || !validatePhone(phoneNumber)) {
    return res.status(400).json({ error: 'Valid phone number required (+91...)' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phoneNumber, { otp, expires: Date.now() + 5 * 60 * 1000 });

  console.log(`[TESTING] OTP for ${phoneNumber}: ${otp}`);

  let sentViaSms = false;

  if (process.env.TWILIO_ACCOUNT_SID && 
      process.env.TWILIO_ACCOUNT_SID !== 'your-twilio-sid' && 
      process.env.TWILIO_AUTH_TOKEN) {
    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: `Your verification code is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
      sentViaSms = true;
    } catch (err) {
      console.error('Twilio Error:', err);
    }
  }

  res.json({ 
    message: sentViaSms 
      ? 'OTP sent successfully' 
      : 'OTP generated (Check backend terminal for code in Dev Mode)' 
  });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;
  const stored = otpStore.get(phoneNumber);

  if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  otpStore.delete(phoneNumber);

  try {
    let result = await pool.query('SELECT * FROM users WHERE phone_number = $1', [phoneNumber]);
    let user = result.rows[0];

    if (!user) {
      result = await pool.query(
        'INSERT INTO users (phone_number, auth_provider) VALUES ($1, $2) RETURNING *',
        [phoneNumber, 'phone']
      );
      user = result.rows[0];
    }

    const token = generateToken(user.id);
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, phone_number } = req.body;
  if (!email || !validateEmail(email)) return res.status(400).json({ error: 'Valid email required' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone_number, hashed_password, auth_provider) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, auth_provider',
      [name, email, phone_number, hashedPassword, 'email']
    );
    const user = result.rows[0];

    const token = generateToken(user.id);
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.json({ user });
  } catch (error: any) {
    if (error.code === '23505') return res.status(400).json({ error: 'Email or phone already exists' });
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !user.hashed_password || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.json({ user: { id: user.id, name: user.name, email: user.email, auth_provider: user.auth_provider } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
