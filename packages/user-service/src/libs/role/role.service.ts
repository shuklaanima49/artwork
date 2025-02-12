import { SupabaseClient,createClient } from "@supabase/supabase-js";


export class RolesService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL as string;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY as string;
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  /**
   * Get all roles from the database
   * @returns {Promise<any>} - A promise that resolves to an array of roles
   * @swagger   
   * /roles:
   *   get:
   *     summary: Get all roles
   *     description: Get all roles from the database
   *     responses:
   *       200:
   *         description: A list of roles 
   *       500:
   *         description: An error occurred while fetching roles
   *       401:                                 
   *         description: Unauthorized
   *       404:
   *         description: Not found
   */

  async getRoles() {
    const { data, error } = await this.supabase.from('roles').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * Create a new role in the database
   * @param {string} role - The name of the role to create
   * @returns {Promise<any>} - A promise that resolves to the created role
   * @swagger
   * /roles:
   *   post:
   *     summary: Create a new role
   *     description: Create a new role in the database
   *     responses:
   *       201:
   *         description: The created role 
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */

  async createRole(role: string,description:string) {
    const { data, error } = await this.supabase.from('roles').insert({ name: role,description });
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * Delete a role from the database
   * @param {string} role - The name of the role to delete
   * @returns {Promise<any>} - A promise that resolves to the deleted role
   * @swagger
   * /roles:
   *   delete:
   *     summary: Delete a role
   *     description: Delete a role from the database
   *     responses:
   *       200:
   *         description: The deleted role  
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   */

  async deleteRole(role: string) {
    const { data, error } = await this.supabase.from('roles').delete().eq('name', role);
    if (error) {
      throw error;
    }
    return data;
  }

  /**
   * Update a role in the database
   * @param {string} role - The name of the role to update
   * @param {string} newName - The new name of the role
   * @returns {Promise<any>} - A promise that resolves to the updated role
   * @swagger
   * /roles:
   *   put:
   *     summary: Update a role
   *     description: Update a role in the database
   *     responses:
   *       201: 
   *         description: The updated role
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */

  async updateRole(role: string, newName: string,description:string) {
    const { data, error } = await this.supabase.from('roles').update({ name: newName,description }).eq('name', role);
    if (error) {
      throw error;
    }
    return data;
  }
  /**
   * Add permissions to a role
   * @param roleId - The id of the role
   * @param permissionIds - The ids of the permissions to add
   * @returns {Promise<any>} - A promise that resolves to the added permissions
   * 
   * @swagger   
   * /roles/{roleId}/permissions:
   *   post:
   *     summary: Add permissions to a role
   *     description: Add permissions to a role
   *     responses:
   *       201:
   */
  async addPermissionsToRole(roleId: string, permissionIds: string[]) {
    const { data, error } = await this.supabase.from('role_permission').insert(permissionIds.map(id => ({ role_id: roleId, permission_id: id })));
    if (error) {
        console.error('Error adding permissions to role:', error);
        throw error;
    }
    return data;    
  }

  /**
     * Remove permissions from a role
     * @param roleId - The id of the role
     * @param permissionIds - The ids of the permissions to remove
     * @returns {Promise<any>} - A promise that resolves to the removed permissions
     * 
     * @swagger   
     * /roles/{roleId}/permissions:
     *   delete:
     *     summary: Remove permissions from a role
     *     description: Remove permissions from a role
     *     responses:
     *       200: removed permissions
     *       400: bad request
     *       401: unauthorized
     *       403: forbidden
     *       404: not found
     */
  async  removePermissionsFromRole(roleId: string, permissionIds: string[]) {
    const { error } = await this.supabase
        .from('role_permissions')
        .delete()
        .in('permission_id', permissionIds)
        .eq('role_id', roleId);

    if (error) {
        console.error('Error removing permissions from role:', error);
        throw error;
    }

    console.log(`Permissions removed from role ${roleId} successfully.`);
    }

  /**
   * Update the permissions of a role
   * @param roleId - The id of the role
   * @param newPermissionIds - The ids of the permissions to add
   * @returns {Promise<any>} - A promise that resolves to the updated permissions
   *
   * @swagger   
   * /roles/{roleId}/permissions:
   *   put:
   *     summary: Update the permissions of a role
   *     description: Update the permissions of a role
   *     responses:
   *       201: updated permissions
   *       400: bad request
   *       401: unauthorized
   *       403: forbidden
   *       404: not found
   */
  async  updateRolePermissions( roleId: string, newPermissionIds: string[]) {
        try{
             await this.removePermissionsFromRole(roleId,newPermissionIds)
             await this.addPermissionsToRole(roleId,newPermissionIds)
        }catch(error){
            console.error('Error adding new permissions:', error);
            throw error;
        }

        console.log(`Updated permissions for role ${roleId} successfully.`);
    }

  /**
   * Get the permissions of a role
   * @param roleId - The id of the role
   * @returns {Promise<any>} - A promise that resolves to the permissions of the role
   * 
   */
  async getRolePermissions(roleId: string) {
    const { data, error } = await this.supabase.from('role_permissions').select('*').eq('role_id', roleId);
    if (error) {
      throw error;
    }
    return data;
  }


}


export default RolesService;
