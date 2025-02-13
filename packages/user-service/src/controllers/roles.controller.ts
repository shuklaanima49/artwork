import { Request, Response } from 'express';
import RolesService from '../libs/role/role.service';

export class RolesController {
  private rolesService: RolesService;

  constructor() {
    this.rolesService = new RolesService();
  }
  /**
   * get all roles endpoint
   * @param req 
   * @param res 
   */
  async getRoles(req: Request, res: Response) {
    try {
        const roles = await this.rolesService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error getting roles:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * get a role by id endpoint
   * @param req 
   * @param res 
   */
  async getRole(req: Request, res: Response) {
    const { roleId } = req.params;  
    try {
      const role = await this.rolesService.getRole(roleId);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error getting role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * create role endpoint
   * @param req 
   * @param res 
   */
  async createRole(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
      const role = await this.rolesService.createRole(name, description);
      res.status(201).json(role);
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * update role endpoint
   * @param req 
   * @param res 
   */
  async updateRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const { name, description } = req.body;
    try {
      const role = await this.rolesService.updateRole(roleId,name, description);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error updating role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * delete role endpoint
   * @param req 
   * @param res 
   */
  async deleteRole(req: Request, res: Response) {
    const { roleId } = req.params;
    try {
      const role = await this.rolesService.deleteRole(roleId);
       res.status(200).json(role);
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * add permissions to a role endpoint
   * @param req 
   * @param res 
   */
  async addPermissionsToRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const { permissionIds } = req.body;
    try { 
      const role = await this.rolesService.addPermissionsToRole(roleId, permissionIds);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error adding permissions to role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * remove permissions from a  role endpoint
   * @param req 
   * @param res 
   */ 
  async removePermissionsFromRole(req: Request, res: Response) {  
    const { roleId } = req.params;
    const { permissionIds } = req.body;
    try {
      const role = await this.rolesService.removePermissionsFromRole(roleId, permissionIds);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error removing permissions from role:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * update the permissions of a role endpoint 
   * @param req 
   * @param res 
   */
  async updateRolePermissions(req: Request, res: Response) {
    const { roleId } = req.params;
    const { permissionIds } = req.body;
    try {
      const role = await this.rolesService.updateRolePermissions(roleId, permissionIds);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error updating role permissions:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
  /**
   * get the permissions of a role endpoint
   * @param req 
   * @param res 
   */
  async getRolePermissions(req: Request, res: Response) { 
    const { roleId } = req.params;
    try {
      const role = await this.rolesService.getRolePermissions(roleId);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error getting role permissions:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  }
}   

export default RolesController;
