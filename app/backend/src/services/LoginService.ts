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
    const user: IUser | null = await this._model.findOne({
      where: { email },
    });
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

  private static async verifyPassword(password: string, user: IUser): Promise<string> {
    const token = generateToken(user.password);
    return token;
  }
}
