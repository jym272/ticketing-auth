import { Request, Response } from 'express';
import { getEnvOrFail, httpStatusCodes, signJwtToken, throwError } from '@utils/index';
import { Credentials } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
const { BAD_REQUEST, OK } = httpStatusCodes;
const pepper = getEnvOrFail('PASSWORD_PEPPER');

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

    req.session = {
      jwt: signJwtToken(user)
    };

    return res.status(OK).json({ message: 'User logged in.' });
  };
};
