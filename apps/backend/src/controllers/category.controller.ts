import { Request, Response } from 'express';
import ResponseHandler from '../utils/responseHandler';
import { getCategory } from '../services/category/getCategory.services';
import { createCategory } from '../services/category/createCategory.services';
import { updateCategory } from '../services/category/updateCategory.sevices';
import { deleteCategory } from '../services/category/deleteCategory.services';

export class CategoryController {
  async getCategory(req: Request, res: Response): Promise<any> {
    try {
      const { page } = req.query;
      const result = await getCategory(page, '8');

      return ResponseHandler.success(res, 200, 'Get Category Data Success', result);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async createCategory(req: Request, res: Response): Promise<any> {
    try {
      const name = req.body.name as string;
      const objectPayload = { name };

      const result = await createCategory(objectPayload);

      return ResponseHandler.success(res, 200, 'Create Category Success', result);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async updateCategory(req: Request, res: Response): Promise<any> {
    try {
      const name = req.body.name as string;
      const id = req.body.id as string;
      const objectPayload = { id, name };

      const result = await updateCategory(objectPayload);

      return ResponseHandler.success(res, 200, 'Update Category Success', result);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  //MASIH HARD DELETE
  async deleteCategory(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id as string;
      const result = await deleteCategory({ id });

      return ResponseHandler.success(res, 200, 'Delete category success', result);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
}
