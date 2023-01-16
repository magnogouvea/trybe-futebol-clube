import generateToken from '../utils/token';
import IUser from '../entities/IUser';
import Users from '../database/models/UserModel';

export default class LoginService {
  private _model;

  constructor() {
    this._model = Users;
  }

  public async userLogin(userBody: IUser): Promise<string> {
    const user: IUser | null = await this._model.findOne({
      where: { email: userBody.email },
    });
    const token = await LoginService.verifyPassword(userBody.password, user as IUser);
    return token;
  }

  private static async verifyPassword(password: string, user: IUser): Promise<string> {
    const token = generateToken(user.password);
    return token;
  }
}
