import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'JWT secret is not defined' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    //@ts-expect-error we'll see this later
    req.user = decoded; // Attach the user info to the request
    return next();
  });
  return;
}
