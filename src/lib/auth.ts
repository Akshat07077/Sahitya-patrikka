import jwt, { SignOptions } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET: string = process.env.JWT_SECRET || 'dev-secret-change-me';

export type JwtPayload = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'EDITOR' | 'REVIEWER';
  iat?: number;
  exp?: number;
};

export function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresIn: SignOptions['expiresIn'] = '7d') {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function getAuthTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

