import { NextFunction, Request, Response } from 'express';
import { cleanEmail, isValidEmail, isValidPassword } from '@utils/index';
import { Credentials } from '@custom-types/index';
import { httpStatusCodes, throwError } from '@jym272ticketing/common/dist/utils';

export const checkCredentialsController = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { password, email: rawEmail } = req.body as Credentials;
    const email = cleanEmail(rawEmail);
    if (!isValidEmail(email)) {
      throwError('Invalid credentials.', httpStatusCodes.BAD_REQUEST, new Error(`Email invalid: ${email}`));
    }
    if (!isValidPassword(password)) {
      throwError('Invalid credentials.', httpStatusCodes.BAD_REQUEST, new Error(`Password invalid: ${password}`));
    }
    res.locals = {
      ...res.locals,
      email,
      password
    };
    next();
  };
};
