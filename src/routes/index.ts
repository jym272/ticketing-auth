import express from 'express';
import { auth } from '@routes/auth';
import { routes as commonRoutes } from '@jym272ticketing/common';
const { utils, home } = commonRoutes;

const routes = [home, auth, utils];

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};
