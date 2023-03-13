import { NextFunction, Request, Response } from 'express';
import { cleanEmail, httpStatusCodes, isValidEmail, isValidPassword, throwError } from '@utils/index';
import { Credentials } from '@custom-types/index';

export const checkCredentialsController = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { password, email: rawEmail } = req.body as Credentials;
    const email = cleanEmail(rawEmail);
    if (!isValidEmail(email) || !isValidPassword(password)) {
      throwError('Invalid credentials.', httpStatusCodes.BAD_REQUEST);
    }
    res.locals = {
      ...res.locals,
      email,
      password
    };
    next();
  };
};
