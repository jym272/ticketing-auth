import { hashedPasswordController } from '@controllers/auth/hashedPassword';
import { updateTokenController } from '@controllers/auth/updateToken';
import { verifyTokenController } from '@controllers/auth/verifyToken';
import { signinController } from '@controllers/auth/signin';
import { signupController } from '@controllers/auth/signup';
import { signoutController } from '@controllers/auth/signout';
import { currentUserController } from '@controllers/auth/currentUser';

export const authController = {
  hashedPassword: hashedPasswordController(),
  updateToken: updateTokenController(),
  verifyToken: verifyTokenController(),
  signin: signinController(),
  signup: signupController(),
  signout: signoutController(),
  currentUser: currentUserController()
};
