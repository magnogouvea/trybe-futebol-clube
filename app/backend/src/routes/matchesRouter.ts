import * as express from 'express';
import matchesValidation from '../middleware/matchesValidation';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = express.Router();

router.get('/', (req, res) => matchesController.findAllMatchesFilter(req, res));
router.post('/', matchesValidation, (req, res) => matchesController.saveMatchInProgress(req, res));
router.patch('/:id/finish', (req, res) => matchesController.updateStatusMatches(req, res));
router.patch('/:id', (req, res) => matchesController.updateMatchGoals(req, res));

export default router;
