import { hashedPasswordController } from '@controllers/auth/hashedPassword';
import { updateTokenController } from '@controllers/auth/updateToken';
import { verifyTokenController } from '@controllers/auth/verifyToken';

export const authController = {
  hashedPassword: hashedPasswordController(),
  updateToken: updateTokenController(),
  verifyToken: verifyTokenController()
};
