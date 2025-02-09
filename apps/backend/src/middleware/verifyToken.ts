import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/responseHandler';
import { JwtPayload, verify } from 'jsonwebtoken';
import { findAccount } from '../utils/findAccount';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return ResponseHandler.error(res, 404, 'token not found');
    }
    const converted = verify(token, 'secretkeys') as JwtPayload;
    const isAccExist = await findAccount(converted.email);
    if (!isAccExist) {
      return ResponseHandler.error(res, 404, 'Account not found');
    }

    res.locals.account = isAccExist;
    next();
  } catch (error) {
    return ResponseHandler.error(res, 500, 'Verify token is failed', error);
  }
};
