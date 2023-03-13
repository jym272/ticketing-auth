import { Request, Response } from 'express';
import { getEnvOrFail, httpStatusCodes, throwError } from '@utils/index';
import { Credentials } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { BAD_REQUEST, OK } = httpStatusCodes;
const pepper = getEnvOrFail('PASSWORD_PEPPER');
const secret = getEnvOrFail('JWT_SECRET');

export const signinController = () => {
  return async (req: Request, res: Response) => {
    const { email, password } = res.locals as Credentials;
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return throwError('Invalid credentials.', BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(password + pepper, user.hashPassword);
    if (!isPasswordValid) {
      throwError('Invalid credentials.', BAD_REQUEST);
    }

    const payload = {
      permissions: {
        authenticate: true
      }
    };
    const options = {
      expiresIn: '1d',
      issuer: 'auth-api',
      subject: user.email,
      jwtid: user.id.toString(),
      audience: 'ticketing-frontend'
    };
    const token = jwt.sign(payload, secret, options);
    req.session = {
      jwt: token
    };

    return res.status(OK).json({ message: 'User logged in.' });
  };
};
