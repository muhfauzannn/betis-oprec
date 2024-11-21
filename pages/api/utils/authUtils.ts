import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// Fungsi untuk membuat hash password
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

// Fungsi untuk memverifikasi password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Fungsi untuk membuat JWT
export const generateToken = (payload: { id: number; name: string; email: string }): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};
