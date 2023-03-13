import { Router } from 'express';
import { authController } from '@controllers/auth';
const { signup, signin, signout, currentUser, checkCredentials, verifyCurrentUser } = authController;

export const auth = Router();

auth.post('/api/users/signup', checkCredentials, signup);
auth.post('/api/users/signin', checkCredentials, signin);
auth.post('/api/users/signout', signout);
auth.get('/api/users/current-user', verifyCurrentUser, currentUser);
