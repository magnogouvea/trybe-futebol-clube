import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IError from '../entities/IError';
import generateToken from '../utils/token';
import IUser from '../entities/IUser';
import Users from '../database/models/UserModel';

export default class LoginService {
  private _model;

  constructor() {
    this._model = Users;
  }

  public async userLogin(userBody: IUser): Promise<string> {
    const { email, password } = userBody;
    const user: IUser | null = await this.findUser(email);
    await LoginService.verifyUser(user);
    const token = await LoginService.verifyPassword(password, user as IUser);
    return token;
  }

  private static async verifyUser(user: IUser | null): Promise<void> {
    if (!user) {
      const err: IError = new Error('Incorrect email or password');
      err.status = 401;
      throw err;
    }
  }

  public async loginValidation(token: string): Promise<object> {
    const email = jwt.verify(token, process.env.JWT_SECRET as string) as string;
    const user = await this.findUser(email);
    return { role: user.role };
  }

  private async findUser(email: string): Promise<IUser> {
    const user: IUser | null = await this._model.findOne({ where: { email } });
    return user as IUser;
  }

  private static async verifyPassword(password: string, user: IUser): Promise<string> {
    const cryptPassword = await bcrypt.compare(password, user.password);
    if (!cryptPassword) {
      const err: IError = new Error('Incorrect email or password');
      err.status = 401;
      throw err;
    }
    const token = generateToken(user.email);
    return token;
  }
}
