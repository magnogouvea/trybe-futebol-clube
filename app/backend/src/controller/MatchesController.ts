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

  public async saveMatchInProgress(req: Request, res: Response) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
    const createMatch = await this.matchesService.saveMatchesInProgress({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
    });

    return res.status(201).json(createMatch);
  }

  public async updateStatusMatches(req: Request, res: Response) {
    const intergerId = parseInt(req.params.id, 10);
    await this.matchesService.updateStatusMatches(intergerId);
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatchGoals(req: Request, res: Response) {
    const intergerId = parseInt(req.params.id, 10);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatchGoals(intergerId, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Goals Updated' });
  }
}
