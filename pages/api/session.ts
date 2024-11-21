// pages/api/session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['session'];

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userData = jwt.verify(token, secretKey);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Invalid session token:', error);
    res.status(401).json({ error: 'Invalid session token' });
  }
}
