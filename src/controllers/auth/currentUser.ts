import { Request, Response } from 'express';
import { User } from '@db/models';
import { httpStatusCodes } from '@jym272ticketing/common/dist/utils';
const { OK } = httpStatusCodes;
export const currentUserController = () => {
  return async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(OK).json({ currentUser: null });
    }
    const payload = req.currentUser;
    const { sub, jti } = payload;
    const user = await User.findOne({
      where: {
        id: jti,
        email: sub
      }
    });
    if (!user) {
      return res.status(OK).json({ currentUser: null });
    }
    res.status(OK).json({ currentUser: payload });
  };
};
