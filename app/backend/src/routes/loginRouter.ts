import * as express from 'express';
import LoginController from '../controller/Login.Controller';

const loginController = new LoginController();

const router = express.Router();

router.post('/', (req, res) => loginController.userLogin(req, res));

export default router;
