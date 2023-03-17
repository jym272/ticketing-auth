import { Request, Response } from 'express';
import { getEnvOrFail, httpStatusCodes, signJwtToken, throwError } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Credentials } from '@custom-types/index';
import { User } from '@db/models';
import bcrypt from 'bcrypt';
const sequelize = getSequelizeClient();
const pepper = getEnvOrFail('PASSWORD_PEPPER');
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
      throwError('Email already exists.', CONFLICT, new Error(`User with email ${email} already exists.`));
    }

    const hashPassword = await bcrypt.hash(password + pepper, 10);

    try {
      const user = await sequelize.transaction(async () => {
        return await User.create({
          hashPassword,
          email
        });
      });

      req.session = {
        jwt: signJwtToken(user)
      };

      return res.status(CREATED).json({ message: 'User created.' });
    } catch (err) {
      let error = new Error(`Creating User failed. email ${email}.`);
      if (err instanceof Error) {
        error = err;
      }
      throwError('Creating User failed.', INTERNAL_SERVER_ERROR, error);
    }
  };
};
