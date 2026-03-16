import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getProfile = async (req: any, res: Response) => {
  try {
    const result = await pool.query('SELECT id, name, email, phone_number, auth_provider, created_at FROM users WHERE id = $1', [req.userId]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
