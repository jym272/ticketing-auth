import { Response } from 'express';
import { ErrorWithStatus } from '@custom-types/index';
import { HttpStatusCodes } from '@utils/statusCodes';

export const successConnectionMsg = (msg: string) => {
  // eslint-disable-next-line no-console
  if (!process.env.CI) console.log('\x1b[32m%s\x1b[0m', msg);
};
// todo: creo que va a ser eliminado con el tiempo
export const controllerErrorWithMessage = (
  res: Response,
  err: any,
  message: string,
  statusCode: HttpStatusCodes = 400
) => {
  // eslint-disable-next-line no-console
  if (!process.env.CI) console.log('ERROR: ', err ?? message);
  return res.status(statusCode).json({ message });
};

export const throwError = (message: string, statusCode: HttpStatusCodes = 500, err: any | undefined = undefined) => {
  // eslint-disable-next-line no-console -- this is a dev tool
  if (!process.env.CI) console.log('ERROR: ', err ?? message);
  const newError = new Error(message) as ErrorWithStatus;
  newError.statusCode = statusCode;
  throw newError;
};
