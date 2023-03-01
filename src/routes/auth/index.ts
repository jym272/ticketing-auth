import { Router } from 'express';
import { authController } from '@controllers/auth';

export const auth = Router();

auth.post('/api/users/signup', authController.signup);
auth.post('/api/users/signin', authController.signin);
auth.post('/api/users/signout', authController.signout);
auth.get('/api/users/current-user', authController.currentUser);
