import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import TeamsService from '../services/TeamsService';
import IError from '../entities/IError';

const tokenValidation = async (token: string | undefined) => {
  try {
    jwt.verify(token as string, 'jwt_secret');
  } catch (err) {
    const error: IError = new Error('Token must be a valid token');
    error.status = 401;
    throw error;
  }
};

const matchesValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const token = req.headers.authorization;
  await tokenValidation(token);

  if (homeTeam === awayTeam) {
    const error: IError = new Error('It is not possible to create a match with two equal teams');
    error.status = 422;
    throw error;
  }

  const teamsService = new TeamsService();
  const firstTeam = await teamsService.findTeamById(homeTeam);
  const secondTeam = await teamsService.findTeamById(awayTeam);

  if (!firstTeam || !secondTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default matchesValidation;
