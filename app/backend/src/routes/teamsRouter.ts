import * as express from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/', (req, res) => teamsController.getTeams(req, res));
router.get('/:id', (req, res) => teamsController.findTeamById(req, res));

export default router;
