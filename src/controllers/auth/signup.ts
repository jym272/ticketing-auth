import { Request, Response } from 'express';
import { cleanEmail, getEnvOrFail, isValidEmail, throwError } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Credentials } from '@custom-types/index';
import { Auth } from '@db/models';
import bcrypt from 'bcrypt';
const sequelize = getSequelizeClient();

const pepper = getEnvOrFail('PASSWORD_PEPPER');

export const signupController = () => {
  return async (req: Request, res: Response) => {
    const { email: rawEmail, password } = req.body as Credentials;
    const email = cleanEmail(rawEmail);

    if (!isValidEmail(email)) {
      return throwError('Invalid email.', 400);
    }
    // TODO: create validation controller
    // check if email already exists
    // const { password, email } = req.body as AccessType;
    const hashPassword = await bcrypt.hash(password + pepper, 10);

    try {
      await sequelize.transaction(async () => {
        return await Auth.create({
          hashPassword,
          email
        });
      });
      return res.json({ message: 'Auth created.' });
    } catch (err) {
      return throwError('Creating Auth failed.', 500, err);
    }
  };
};
