import express, { Request, Response, Router } from 'express';
import {UserService} from '@artwork-management/user';
import {generateJWT, jwtMiddleware} from '@artwork-management/auth';
import {rbacGuard} from '@artwork-management/rbac';

const userService = new UserService();
const router:Router = express.Router();

// Route to create a user (Admin role required)
router.post('/users', jwtMiddleware, rbacGuard(['admin']), async (req: Request, res: Response) => {
  const { username, password, roles } = req.body;
  const user = await userService.createUser(username, password, roles);
  res.status(201).json(user);
});

// Route to authenticate user and return JWT
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userService.findByUsername(username);

  if (!user || !(await userService.validatePassword(user, password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateJWT(user.id, user.roles);
  res.json({ token });
});

export { router };
