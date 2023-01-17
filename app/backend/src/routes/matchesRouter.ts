import * as express from 'express';
import MatchesController from '../controller/MatchesController';

const macthesController = new MatchesController();

const router = express.Router();

router.get('/', (req, res) => macthesController.findAllMatches(req, res));

export default router;
