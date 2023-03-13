import { NextFunction, Request, Response } from 'express';
import { getEnvOrFail } from '@utils/env';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = getEnvOrFail('JWT_SECRET');
export const verifyCurrentUserController = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      return next();
    }
    try {
      req.currentUser = jwt.verify(String(req.session.jwt), secret) as JwtPayload;
    } catch (e) {
      /* empty */
    }
    next();
  };
};
