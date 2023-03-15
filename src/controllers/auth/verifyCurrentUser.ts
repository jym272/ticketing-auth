import { NextFunction, Request, Response } from 'express';
import { getEnvOrFail } from '@utils/env';
import jwt from 'jsonwebtoken';
import { JwtPayloadCustom } from '@custom-types/index';

const secret = getEnvOrFail('JWT_SECRET');
export const verifyCurrentUserController = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      return next();
    }
    try {
      req.currentUser = jwt.verify(String(req.session.jwt), secret) as JwtPayloadCustom;
    } catch (e) {
      /* empty */
    }
    next();
  };
};
