import { User } from '@db/models';
import jwt from 'jsonwebtoken';
import { getEnvOrFail } from '@utils/env';
import { signJwtTokenOptions } from '@utils/constants';
const secret = getEnvOrFail('JWT_SECRET');

export const signJwtToken = (user: User) => {
  const payload = {
    permissions: {
      authenticated: true
    }
  };
  const options = {
    expiresIn: '1d',
    issuer: signJwtTokenOptions.ISSUER,
    subject: user.email,
    jwtid: user.id.toString(),
    audience: signJwtTokenOptions.AUDIENCE
  };
  return jwt.sign(payload, secret, options);
};
