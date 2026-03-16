import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const rateLimitStore = new Map<string, { count: number, resetAt: number }>();

export const otpRateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (limit && limit.resetAt > now) {
    if (limit.count >= 5) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    limit.count++;
  } else {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  }
  next();
};
