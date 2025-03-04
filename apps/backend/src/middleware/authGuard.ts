import ResponseHandler from '../utils/responseHandler';
import { NextFunction, Request, Response } from 'express';

class AuthGuard {
  async admin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const authUser = res.locals.user;
      if (!authUser) return ResponseHandler.error(res, 404, 'user not found');

      if (authUser.role === 'admin') {
        next();
      } else {
        return ResponseHandler.error(res, 403, 'user not authorized');
      }
    } catch (error) {
      return ResponseHandler.error(res, 500, 'authorization failed');
    }
  }
  async superAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const authUser = res.locals.user;
      if (!authUser) return ResponseHandler.error(res, 404, 'user not found');

      if (authUser.role === 'super_admin') {
        next();
      } else {
        return ResponseHandler.error(res, 403, 'user not authorized');
      }
    } catch (error) {
      return ResponseHandler.error(res, 500, 'authorization failed');
    }
  }
}
export default new AuthGuard();
