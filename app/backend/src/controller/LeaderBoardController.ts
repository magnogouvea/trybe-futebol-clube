import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) { }

  mountLeaderboardHome = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.mountLeaderboardHome();
    res.status(200).json(result);
  };

  mountLeaderboardAway = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.mountLeaderboardAway();
    res.status(200).json(result);
  };

  mountLeaderboard = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.mountLeaderboard();
    res.status(200).json(result);
  };
}
