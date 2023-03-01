import { Request, Response } from 'express';
import { controllerErrorWithMessage, getEnvOrFail } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { Credentials } from '@custom-types/index';
import { Auth } from '@db/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const sequelize = getSequelizeClient();

const pepper = getEnvOrFail('PASSWORD_PEPPER');
const secret = getEnvOrFail('JWT_SECRET');

export const updateTokenController = () => {
  return async (req: Request, res: Response) => {
    const { password, email } = req.body as Credentials;
    const auth = await Auth.findOne({
      where: {
        email
      }
    });
    if (!auth) {
      return res.status(400).json({ message: 'Invalid email.' });
    }
    const hashPassword = auth.hashPassword;
    const isPasswordValid = await bcrypt.compare(password + pepper, hashPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const payload = {
      permissions: {
        authenticate: true
      }
    };
    const options = {
      expiresIn: '1d',
      issuer: 'auth-api',
      subject: auth.email,
      jwtid: auth.id.toString(),
      audience: 'tasks-api'
    };
    const token = jwt.sign(payload, secret, options);

    try {
      await sequelize.transaction(async () => {
        auth.token = token;
        return await auth.save();
      });
      return res.json({ token });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Saving Auth token failed.');
    }
  };
};
