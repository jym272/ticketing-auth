import express from 'express';
import { home } from '@routes/home';
import { utils } from '@routes/utils';
import { auth } from '@routes/auth';

const routes = [home, auth, utils];

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};
