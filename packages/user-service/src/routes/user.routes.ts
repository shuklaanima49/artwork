import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

enum ROUTE_PATH {
  CREATE_USER = '/user',
  LOGIN = '/login',
  VERIFY_OTP = '/verify-otp',
}

export class UserRouter {
  private router: Router;
  private userController: UserController;
  
  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    /**
     * @swagger
     * /auth/user:
     *  post:
     *   summary: Create a new user in the system
     *   description: Only admin can create a new user
     *   requestBody: 
     *     required: true
     *     content: 
     *       application/json:
     *         schema: 
     *           type: object  
     *           properties:
     *             email: 
     *               type: email
     *             password:
     *               type: string
     *             user_metadata:  
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 country:
     *                   type: string
     *                 phone:
     *                   type: string
     *   responses:
     *     201: 
     *       description: User created successfully
     *     500:
     *       description: Something went wrong, please try again later
     */

    this.router.post(
      ROUTE_PATH.CREATE_USER,
      this.userController.createUser.bind(this.userController)
    );
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login to the system
     *     description: Login to the system with username and password
     *     requestBody: 
     *       required: true
     *       content: 
     *         application/json:
     *           schema: 
     *             type: object
     *             properties:
     *               email: 
     *                 type: email
     *               password:
     *                 type: string
     *     responses:
     *       200: 
     *         description: User logged in successfully
     *       401:
     *         description: Invalid credentials
     */
    this.router.post(ROUTE_PATH.LOGIN, this.userController.login.bind(this.userController));

    /**   
     * @swagger
     * /auth/verify-otp:
     *   post:
     *     summary: Verify OTP
     *     description: Verify OTP with email and token
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object   
     *             properties:
     *               email:
     *                 type: string
     *               token:
     *                 type: string
     *     responses:
     *       200:
     *         description: OTP verified successfully
     *       400:
     *         description: OTP verification failed
     */
    this.router.post(ROUTE_PATH.VERIFY_OTP, this.userController.verifyOTP.bind(this.userController));

  }
  getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
