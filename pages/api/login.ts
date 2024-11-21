import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { readDataUser } from './utils/dataHandler';
import { verifyPassword, generateToken } from './utils/authUtils';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is allowed.' });
  }

  try {
    const { email, password }: { email: string; password: string } = req.body;

    const dataUser = readDataUser();

    // Find user by email
    const user = dataUser.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const sessionToken = generateToken({ id: user.id, name: user.name, email: user.email });

    const cookie = serialize('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 minggu
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
