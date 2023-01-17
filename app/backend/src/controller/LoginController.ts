import { Request, Response } from 'express';
import IUser from '../entities/IUser';
import LoginService from '../services/LoginService';

export default class LoginController {
  private loginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginService.userLogin({ email, password } as IUser);
    res.status(200).json({ token });
  }

  public async loginValidation(req: Request, res: Response) {
    const token = req.headers.authorization;
    const role = await this.loginService.loginValidation(token as string);
    res.status(200).json(role);
  }
}
