import { Request, Response, NextFunction } from 'express';

export function rbacGuard(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-expect-error will see this
    const user = req.user; // Assuming the user object is set by JWT middleware

    if (!user || !roles.some(role => user.roles.includes(role))) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
    return;
  };
}
