import { JwtPayload } from 'jsonwebtoken';

export {};

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
}
