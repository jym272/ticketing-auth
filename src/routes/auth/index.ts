import { Router } from 'express';
import { authController } from '@controllers/auth';
const { signup, signin, signout, currentUser, checkCredentials } = authController;
import { commonController } from '@jym272ticketing/common';
const { verifyCurrentUser } = commonController;
import { getEnvOrFail } from '@utils/env';

export const auth = Router();
const secret = getEnvOrFail('JWT_SECRET');

auth.post('/api/users/signup', checkCredentials, signup);
auth.post('/api/users/signin', checkCredentials, signin);
auth.post('/api/users/signout', signout);
auth.get('/api/users/current-user', verifyCurrentUser(secret), currentUser);
