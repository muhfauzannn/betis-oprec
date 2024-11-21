import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Clear the session cookie by setting it to expire immediately
    const cookie = serialize('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire immediately
      path: '/',
    });

    // Set the cookie in the response headers
    res.setHeader('Set-Cookie', cookie);

    // Return a success response
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
