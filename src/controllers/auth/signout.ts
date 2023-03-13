import { Request, Response } from 'express';

export const signoutController = () => {
  return (req: Request, res: Response) => {
    req.session = null;
    res.json({ message: 'User logged out.' });
  };
};
