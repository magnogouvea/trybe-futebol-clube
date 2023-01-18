import * as express from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = express.Router();

router.get('/', (req, res) => matchesController.findAllMatchesFilter(req, res));
router.post('/', (req, res) => matchesController.saveMatchInProgress(req, res));
router.patch('/:id/finish', (req, res) => matchesController.updateStatusMatches(req, res));

export default router;
