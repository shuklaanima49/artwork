// libs/user/src/lib/user.service.ts

import bcrypt from 'bcrypt';
import { User } from './user.model';

export class UserService {
  private users: User[] = [];

  async createUser(username: string, password: string, roles: string[] = ['user']): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = { id: Date.now().toString(), username, passwordHash, roles };
    this.users.push(newUser);
    return newUser;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
