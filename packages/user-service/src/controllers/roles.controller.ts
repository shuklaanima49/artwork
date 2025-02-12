import { Request, Response } from 'express';
import RolesService from '../libs/role/role.service';

export class RolesController {
  private rolesService: RolesService;

  constructor() {
    this.rolesService = new RolesService();
  }

  async getRoles(req: Request, res: Response) {
    const roles = await this.rolesService.getRoles();
    res.status(200).json(roles);
  }

  async createRole(req: Request, res: Response) {
    const { name, description } = req.body;
    const role = await this.rolesService.createRole(name, description);
    res.status(201).json(role);
  }
}   

export default RolesController;
