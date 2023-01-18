import * as express from 'express';
import LeaderboardController from '../controller/LeaderBoardController';

const LeaderboardRouter = express.Router();

const controller = new LeaderboardController();

LeaderboardRouter.get('/home', controller.mountLeaderboardHome);

LeaderboardRouter.get('/away', controller.mountLeaderboardAway);

LeaderboardRouter.get('/', controller.mountLeaderboard);

export default LeaderboardRouter;
