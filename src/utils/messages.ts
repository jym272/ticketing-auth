import { Response } from 'express';
import { ErrorWithStatus } from '@custom-types/index';
import { HttpStatusCodes } from '@utils/statusCodes';

// eslint-disable-next-line no-console
export const log = console.log;

export const successConnectionMsg = (msg: string) => log('\x1b[32m%s\x1b[0m', msg);

// todo: creo que va a ser eliminado con el tiempo
export const controllerErrorWithMessage = (
  res: Response,
  err: any,
  message: string,
  statusCode: HttpStatusCodes = 400
) => {
  if (!process.env.CI) log('ERROR: ', err ?? message);
  return res.status(statusCode).json({ message });
};

export const activateLogging = () => !(process.env.NODE_ENV === 'test');

export const throwError = (message: string, statusCode: HttpStatusCodes = 500, err: any | undefined = undefined) => {
  if (activateLogging()) log('ERROR: ', err ?? message);
  const newError = new Error(message) as ErrorWithStatus;
  newError.statusCode = statusCode;
  throw newError;
};
