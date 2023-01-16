import { NextFunction, Request, Response } from 'express';
import IError from '../entities/IError';

const loginValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err: IError = new Error('All fields must be filled');
    err.status = 400;
    throw err;
  }

  next();
};

export default loginValidation;
