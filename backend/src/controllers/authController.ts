import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db';
import { generateToken, validateEmail } from '../utils/helpers';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, phone_number } = req.body;
  if (!email || !validateEmail(email)) return res.status(400).json({ error: 'Valid email required' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  try {
    const normalizedEmail = email.toLowerCase().trim();
    console.log('[Signup] Attempt for:', normalizedEmail);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone_number, hashed_password, auth_provider) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, auth_provider',
      [name, normalizedEmail, phone_number, hashedPassword, 'email']
    );
    const user = result.rows[0];
    console.log('[Signup] User created:', user.id);

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
    const normalizedEmail = email?.toLowerCase().trim();
    console.log('[Login] Attempt for:', normalizedEmail);
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
    const user = result.rows[0];

    if (!user) {
      console.log('[Login] User not found for email:', normalizedEmail);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('[Login] User found:', user.email, '| Provider:', user.auth_provider);
    
    if (!user.hashed_password) {
      console.log('[Login] No hashed_password for user:', user.email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
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
