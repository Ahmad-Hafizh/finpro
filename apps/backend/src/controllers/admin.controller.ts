import { Request, Response } from 'express';
import { prisma } from '../../../../packages/database/src/client';
import ResponseHandler from '../utils/responseHandler';
import { findAdmin } from '../services/admin/getAdmin.services';

export class AdminController {
  async getAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { storeNew, page, keywordNew } = req.query;
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = 6;
      const store = storeNew as string;
      const keyword = keywordNew as string;
      const objectP = { store, pageNumber, pageSize, keyword };

      const result = await findAdmin(objectP);

      return ResponseHandler.success(res, 200, 'Get Admin Data Success', result);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async updateAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { admin_id, user_id, store_id, position } = req.body;
      const checkAdmin = await prisma.admin.findUnique({
        where: { admin_id: admin_id },
      });

      if (!checkAdmin) {
        throw new Error('Admin not found');
      }

      const result = await prisma.admin.update({
        where: {
          admin_id: admin_id,
        },
        data: {
          position: position as string,
          store_id: store_id as number,
        },
      });

      return ResponseHandler.success(res, 200, 'Update admin success', result);
    } catch (error) {
      return ResponseHandler.error(res, 200, 'Update admin success', error);
    }
  }
}
