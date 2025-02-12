import { Request, Response } from 'express';
import { generateJWT } from '../libs/auth/jwt.service';
import { UserService } from '../libs/user/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Signup endpoint.
   * Initiates user registration and sends an OTP email for verification.
   */
  async createUser(req: Request, res: Response) {
    try {
      const { email, password, user_metadata } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const signUpResult = await this.userService.signUp(email, user_metadata, password);
      return res.status(201).json({
        message: 'User registered. Please verify your email with the OTP sent.',
        user: signUpResult.user
      });

    } catch (err) {
      console.error('Error signing up user:', err);
      return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
  }

  /**
   * Login endpoint.
   * Signs in the user and returns a session.
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const signInResult = await this.userService.signIn(email, password);
      if (!signInResult.session) {
        return res.status(401).json({ message: 'Invalid credentials or email not verified' });
      }
      // Generate JWT if needed or use Supabase session token directly.
      const token = generateJWT(signInResult.user?.id, signInResult.user?.user_metadata?.roles);
      return res.json({ token, session: signInResult.session });
    } catch (err) {
      console.error('Error signing in:', err);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  /**
   * OTP Verification endpoint.
   * Validates the OTP and activates the user account.
   */
  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, token } = req.body;
      if (!email || !token) {
        return res.status(400).json({ message: 'Email and token are required' });
      }
      console.log('Verifying OTP for:', { email });
      const verificationResult = await this.userService.verifyOTP(email, token);
      return res.json({
        message: 'Email verified successfully',
        user: verificationResult.user
      });
    } catch (err) {
      console.error('Error verifying OTP:', err);
      return res.status(400).json({ message: 'OTP verification failed' });
    }
  }

}
