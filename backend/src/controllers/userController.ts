import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getProfile = async (req: any, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone_number, auth_provider, created_at FROM users WHERE id = $1',
      [req.userId]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('[getProfile] error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name, phone_number } = req.body;

    // Validate phone number format (10–15 digits, optional leading +)
    if (phone_number !== undefined && phone_number !== null && phone_number !== '') {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      const cleaned = String(phone_number).replace(/\s/g, '');
      if (!phoneRegex.test(cleaned)) {
        return res.status(400).json({ error: 'Invalid phone number format. Use 10–15 digits.' });
      }
    }

    // Build SET clause dynamically — only update provided fields
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (name !== undefined && name !== null) {
      const trimmed = String(name).trim();
      if (!trimmed) return res.status(400).json({ error: 'Name cannot be empty' });
      fields.push(`name = $${idx++}`);
      values.push(trimmed);
    }

    if (phone_number !== undefined && phone_number !== null) {
      const cleaned = String(phone_number).replace(/\s/g, '');
      fields.push(`phone_number = $${idx++}`);
      values.push(cleaned || null);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    values.push(req.userId);

    const sql = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING id, name, email, phone_number, auth_provider, created_at
    `;

    console.log('[updateProfile] SQL:', sql, 'Values:', values);

    const result = await pool.query(sql, values);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user, message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('[updateProfile] error:', error);

    // Duplicate phone_number (unique constraint violation)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This phone number is already linked to another account' });
    }

    // Column does not exist or other SQL error — return clear message
    res.status(500).json({ error: `Database error: ${error.message}` });
  }
};
