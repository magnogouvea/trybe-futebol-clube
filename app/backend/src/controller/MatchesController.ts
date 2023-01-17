import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async findAllMatchesFilter(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.matchesService.findAllMatches();
      return res.status(200).json(matches);
    }

    const matchesInProgress = inProgress === 'true';

    const filteredMatches = await this.matchesService.findMatchesInProgress(matchesInProgress);
    return res.status(200).json(filteredMatches);
  }
}
