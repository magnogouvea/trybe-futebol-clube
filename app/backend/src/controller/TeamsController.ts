import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private teamsService = new TeamsService();

  public async getTeams(req: Request, res: Response): Promise<Response> {
    const teams = await this.teamsService.getTeams();
    return res.status(200).json(teams);
  }
}
