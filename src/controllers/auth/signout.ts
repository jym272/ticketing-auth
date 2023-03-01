import { Request, Response } from 'express';
import { controllerErrorWithMessage, getEnvOrFail } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Credentials } from '@custom-types/index';
import { Auth } from '@db/models';
import bcrypt from 'bcrypt';
const sequelize = getSequelizeClient();

const pepper = getEnvOrFail('PASSWORD_PEPPER');

export const signoutController = () => {
  return async (req: Request, res: Response) => {
    const { password, email } = req.body as Credentials;
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
      return controllerErrorWithMessage(res, err, 'Creating Auth failed.');
    }
  };
};
