import { Router } from 'express';
import { utilsController } from '@controllers/index';

export const utils = Router();

utils.get('/crash-server', utilsController.crashServer);
utils.get('/health', utilsController.health);
utils.get('/env', utilsController.env);
utils.use('*', utilsController.notFound);
