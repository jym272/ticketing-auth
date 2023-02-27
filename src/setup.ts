import express from 'express';
import { addRoutes } from '@routes/index';
import { addMiddlewares } from '@middlewares/index';
import { createSequelize, initializeSequelize } from '@db/sequelize';

const createServer = (): express.Express => {
  return express();
};

const createExpress = () => createServer();

export const initializeSetup = () => {
  const server = createExpress();
  return {
    server
  };
};

export const startSetup = async (server: express.Express) => {
  const sequelize = createSequelize();
  await initializeSequelize(sequelize);
  addMiddlewares(server);
  addRoutes(server);
};
