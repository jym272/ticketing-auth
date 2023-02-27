import { Response } from 'express';

export const successConnectionMsg = (msg: string) => {
  // eslint-disable-next-line no-console
  if (!process.env.CI) console.log('\x1b[32m%s\x1b[0m', msg);
};

export const controllerErrorWithMessage = (res: Response, err: any, message: string) => {
  // eslint-disable-next-line no-console
  if (!process.env.CI) console.log('ERROR: ', err);
  return res.status(401).json({ message });
};
