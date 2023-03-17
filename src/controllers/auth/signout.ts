import { Request, Response } from 'express';

export const signoutController = () => {
  return (req: Request, res: Response) => {
    //the cookies will be cleared for the user
    req.session = null;
    res.json({ message: 'User logged out.' });
  };
};
