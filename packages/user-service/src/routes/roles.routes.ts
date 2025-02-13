import  { Router } from "express";
import RolesController from "../controllers/roles.controller";

class RolesRouter {
  private router: Router;
  private rolesController: RolesController;
  constructor() {
    this.router = Router();
    this.rolesController = new RolesController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /admin/roles:
     *   get:
     *     summary: Get all roles
     *     description: Get all roles from the database
     *     responses:
     *       200:
     *         description: A list of roles
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
    this.router.get('/roles', this.rolesController.getRoles.bind(this.rolesController));    
    /**
     * @swagger
     * /admin/role/{roleId}:
     *   get:
     *     summary: Get a role by id
     *     description: Get a role by id
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: A role
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
    this.router.get('/role/:roleId', this.rolesController.getRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role:
     *   post:
     *     summary: Create a new role
     *     description: Create a new role in the database only for admin  
     *     requestBody: 
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Role created successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
    this.router.post('/role', this.rolesController.createRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}:
     *   put:
     *     summary: Update a role
     *     description: Update a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:  
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Role updated successfully
     *       401:
      *         description: Unauthorized
     *       404:
     *         description: Not found
     */
      this.router.put('/role/:roleId', this.rolesController.updateRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}:
     *   delete:
     *     summary: Delete a role
      *     description: Delete a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *     responses:
     *       200:
      *         description: Role deleted successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
      this.router.delete('/role/:roleId', this.rolesController.deleteRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}/permissions:
      *   post:
     *     summary: Add permissions to a role
     *     description: Add permissions to a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
      *           schema:
     *             type: object
     *             properties:
     *               permissionIds:
     *                 type: array
     *                 items:
     *                   type: string
     *     responses:
     *       200:
      *         description: Permissions added successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
        this.router.post('/role/:roleId/permissions', this.rolesController.addPermissionsToRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}/permissions:
     *   delete:
     *     summary: Remove permissions from a role
     *     description: Remove permissions from a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
      *           schema:
     *             type: object
     *             properties:
     *               permissionIds:
     *                 type: array
     *                 items:
     *                   type: string
     *     responses:
     *       200:
      *         description: Permissions removed successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */
        this.router.delete('/role/:roleId/permissions', this.rolesController.removePermissionsFromRole.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}/permissions:
     *   put:
     *     summary: Update the permissions of a role
     *     description: Update the permissions of a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
      *           schema:
     *             type: object
     *             properties:
     *               permissionIds:
     *                 type: array
     *                 items:
     *                   type: string
     *     responses:
     *       200:
     *         description: Permissions updated successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */   
        this.router.put('/role/:roleId/permissions', this.rolesController.updateRolePermissions.bind(this.rolesController));

    /**
     * @swagger
     * /admin/role/{roleId}/permissions:
     *   get:
     *     summary: Get the permissions of a role
     *     description: Get the permissions of a role in the database only for admin
     *     parameters:
     *       - name: roleId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Permissions retrieved successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Not found
     */     
        this.router.get('/role/:roleId/permissions', this.rolesController.getRolePermissions.bind(this.rolesController));

    }

  getRouter(): Router { 
    return this.router;
  }

}


export default RolesRouter;
