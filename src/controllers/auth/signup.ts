import { Request, Response } from 'express';
import { getEnvOrFail, httpStatusCodes, throwError } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Credentials } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const sequelize = getSequelizeClient();
const pepper = getEnvOrFail('PASSWORD_PEPPER');
const secret = getEnvOrFail('JWT_SECRET');
const { CREATED, CONFLICT, INTERNAL_SERVER_ERROR } = httpStatusCodes;

export const signupController = () => {
  return async (req: Request, res: Response) => {
    const { email, password } = res.locals as Credentials;

    const userAlreadyExists = await User.findOne({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throwError('Email already exists.', CONFLICT);
    }

    const hashPassword = await bcrypt.hash(password + pepper, 10);

    try {
      const user = await sequelize.transaction(async () => {
        return await User.create({
          hashPassword,
          email
        });
      });

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
      // the user is only sign up, TODO: maybe send the token when the user is logged in
      const token = jwt.sign(payload, secret, options);
      req.session = {
        jwt: token
      };

      return res.status(CREATED).json({ message: 'User created.' });
    } catch (err) {
      throwError('Creating User failed.', INTERNAL_SERVER_ERROR, err);
    }
  };
};
