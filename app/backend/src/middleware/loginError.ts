import { NextFunction, Request, Response } from 'express';
import IError from '../entities/IError';

const error = async (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { message, status } = err;
  res.status(status || 500).json({ message });
};

export default error;
