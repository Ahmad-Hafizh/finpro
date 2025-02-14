import { Response } from 'express';

class ResponseHandler {
  success(res: Response, statusCode: number = 200, message: string, result?: any) {
    return res.status(statusCode).send({
      statusCode,
      isSuccess: true,
      message,
      result,
    });
  }
  error(res: Response, statusCode: number = 500, message: string, error?: any) {
    return res.status(statusCode).send({
      statusCode,
      isSuccess: false,
      message,
      error,
    });
  }
}
export default new ResponseHandler();
