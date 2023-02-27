import { Request, Response } from 'express';
import { getEnvOrFail } from '@utils/env';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Auth } from '@db/models';
import { controllerErrorWithMessage } from '@utils/index';

const secret = getEnvOrFail('JWT_SECRET');

export const verifyTokenController = () => {
  return async (req: Request, res: Response) => {
    const token = req.params.token;
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
      const { sub, jti } = decoded as JwtPayload;

      const auth = await Auth.findOne({
        where: {
          email: sub,
          id: jti
        }
      });

      if (!auth) {
        return controllerErrorWithMessage(res, new Error("Auth row in payload don't exists."), 'Invalid token.');
      }
      return res.json(decoded);
    } catch (e: unknown) {
      const err = e as VerifyErrors;
      const msg = err.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.';
      return res.status(400).json({ message: msg });
    }
  };
};
