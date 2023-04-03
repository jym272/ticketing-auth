import { signinController } from '@controllers/auth/signin';
import { signupController } from '@controllers/auth/signup';
import { signoutController } from '@controllers/auth/signout';
import { currentUserController } from '@controllers/auth/currentUser';
import { checkCredentialsController } from '@controllers/auth/checkCredentials';

export const authController = {
  checkCredentials: checkCredentialsController(),
  signin: signinController(),
  signup: signupController(),
  signout: signoutController(),
  currentUser: currentUserController()
};
