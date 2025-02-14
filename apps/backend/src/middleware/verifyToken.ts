import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/responseHandler';
import { JwtPayload, verify } from 'jsonwebtoken';
import { findUser } from '../utils/findUser';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ')[1];

    if (!token) {
      return ResponseHandler.error(res, 404, 'token not found');
    }
    const converted = verify(token, process.env.TOKEN_KEY || 'secretkey') as JwtPayload;
    const userExist = await findUser(converted.email);
    if (!userExist) {
      return ResponseHandler.error(res, 404, 'Account not found');
    }

    res.locals.user = userExist;
    next();
  } catch (error) {
    return ResponseHandler.error(res, 500, 'Verify token is failed', error);
  }
};
