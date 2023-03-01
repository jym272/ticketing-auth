import { Router } from 'express';
import { utilsController } from '@controllers/index';
import { throwError } from '@utils/messages';

export const utils = Router();

utils.get('/crash-server', utilsController.crashServer);
utils.get('/health', utilsController.health);
utils.get('/env', utilsController.env);
utils.all('*', () => {
  return throwError('Not Found.', 404);
});
utils.use(utilsController.errorHandler);
