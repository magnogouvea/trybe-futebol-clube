import * as express from 'express';
import loginValidation from '../middleware/loginValidation';
import LoginController from '../controller/Login.Controller';

const loginController = new LoginController();

const router = express.Router();

router.post('/', loginValidation, (req, res) => loginController.userLogin(req, res));

export default router;