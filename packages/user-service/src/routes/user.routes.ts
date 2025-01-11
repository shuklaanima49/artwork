import { Router } from 'express';
import { jwtMiddleware } from '../libs/auth/jwt.middleware';
import { userController } from '../controllers/user.controller';
import { rbacGuard } from '../libs/rbac/rbac.middleware';

enum ROUTE_PATH {
  CREATE_USER = '/user',
  LOGIN = '/login',
}

export class UserRouter {
  private router: Router;
  private userController: userController;
  constructor() {
    this.router = Router();
    this.userController = new userController();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      ROUTE_PATH.CREATE_USER,
      jwtMiddleware,
      rbacGuard(['admin']),
      this.userController.createUser
    );
    this.router.post(ROUTE_PATH.LOGIN, this.userController.login);
  }
  getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
