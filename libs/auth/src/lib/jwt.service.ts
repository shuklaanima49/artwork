// libs/auth/src/lib/jwt.service.ts
import jwt from 'jsonwebtoken';

export function generateJWT(userId: string, roles: string[]): string {
  const payload = { userId, roles };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}
