import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secretToken: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: string) => jwt.sign(payload, secretToken);

export default generateToken;
