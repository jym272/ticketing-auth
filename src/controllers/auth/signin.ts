import { Request, Response } from 'express';
import { signJwtToken } from '@utils/index';
import { Credentials } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
import { getEnvOrFail, httpStatusCodes, throwError } from '@jym272ticketing/common/dist/utils';
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
      return throwError('Invalid credentials.', BAD_REQUEST, new Error(`User with email ${email} not found.`));
    }
    const isPasswordValid = await bcrypt.compare(password + pepper, user.hashPassword);
    if (!isPasswordValid) {
      throwError('Invalid credentials.', BAD_REQUEST, new Error(`Password for user with email ${email} is not valid.`));
    }

    req.session = {
      jwt: signJwtToken(user)
    };

    return res.status(OK).json({ message: 'User logged in.' });
  };
};
