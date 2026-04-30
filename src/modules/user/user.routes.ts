import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { UserController } from './user.controller';
import { loginSchema, regSchema } from './user.schema';

export const userRoutes = Router();

userRoutes.post('/login', validateMiddleware(loginSchema), UserController.login);
userRoutes.post('/register', validateMiddleware(regSchema), UserController.register);
userRoutes.get('/me', authenticateMiddleware, UserController.me);
userRoutes.put('/update-profile/', UserController.updateProfile);
userRoutes.get('/update-profile/', UserController.updateProfile);