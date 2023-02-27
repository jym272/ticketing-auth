import { Router } from 'express';
import { authController } from '@controllers/auth';

export const auth = Router();

auth.post('/hashed-password', authController.hashedPassword);
auth.post('/update-token', authController.updateToken);
auth.get('/verify-token/:token', authController.verifyToken);
