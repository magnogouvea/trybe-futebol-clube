import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async findAllMatches(req: Request, res: Response) {
    const matches = await this.matchesService.findAllMatches();
    return res.status(200).json(matches);
  }
}
