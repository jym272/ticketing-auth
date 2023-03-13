import express from 'express';
import cookieSession from 'cookie-session';

export const addCookieSessionMiddlewares = (server: express.Express) => {
  server.use(
    cookieSession({
      // do not encrypt cookie
      signed: false,
      // only allow cookie to be sent over https connection
      secure: process.env.NODE_ENV !== 'test'
    })
  );
};
