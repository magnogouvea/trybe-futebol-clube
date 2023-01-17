import * as express from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/', (req, res) => teamsController.getTeams(req, res));

export default router;
