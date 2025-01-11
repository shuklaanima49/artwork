import { Request, Response } from 'express';
import { generateJWT } from '../libs/auth/jwt.service';
import { UserService } from '../libs/user/user.service';

interface IUserController {
  createUser: (req: Request, res: Response) => Promise<void>;
  login: (req: Request, res: Response) => Promise<void>;
}

export class userController implements IUserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async createUser(req: Request, res: Response) {
    try {
      const { username, password, roles } = req.body;
      const user = await this.userService.createUser(username, password, roles);
      res.status(201).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'something went wrong, please try again later' });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this.userService.findByUsername(username);
      if (!user || !(await this.userService.validatePassword(user, password))) {
        throw Error(`no user with username ${user}`);
      }
      const token = generateJWT(user.id, user.roles);
      res.json({ token });
    } catch (err) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
