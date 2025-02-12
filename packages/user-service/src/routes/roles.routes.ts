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
     * /admin/roles:
     *   post:
     *     summary: Create a new role
     *     description: Create a new role in the database
     */
  }

  getRouter(): Router { 
    return this.router;
  }

}


export default RolesRouter;
