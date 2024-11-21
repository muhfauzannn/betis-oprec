import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { readDataUser, writeDataUser } from './utils/dataHandler';
import { hashPassword, generateToken } from './utils/authUtils';

export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is allowed.' });
  }

  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const dataUser = readDataUser();

    // Check if the user already exists
    const userExists = dataUser.some((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await hashPassword(password);
    const newId = dataUser.length > 0 ? dataUser[dataUser.length - 1].id + 1 : 1;

    const newUser = { id: newId, name, email, password: hashedPassword };
    dataUser.push(newUser);

    writeDataUser(dataUser);

    const sessionToken = generateToken({ id: newId, name, email });

    const cookie = serialize('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 minggu
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(201).json({
      success: true,
      data: { id: newId, name, email },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
