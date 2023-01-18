import { NextFunction, Request, Response } from 'express';
import IError from '../entities/IError';

const matchesValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    const error: IError = new Error('It is not possible to create a match with two equal teams');
    error.status = 422;
    throw error;
  }
  next();
};

export default matchesValidation;
