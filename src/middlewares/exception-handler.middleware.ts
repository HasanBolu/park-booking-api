import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../common/exceptions/http.exception';
import { HttpStatus } from '../common/enums/http-status.enum';

const errorHandlerMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

export default errorHandlerMiddleware;