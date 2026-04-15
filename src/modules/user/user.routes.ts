import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { UserController } from './user.controller';
import { loginSchema, regSchema } from './user.schema';

export const UserRoutes = Router();

UserRoutes.post('/login', validateMiddleware(loginSchema), UserController.login);
UserRoutes.post('/register', validateMiddleware(regSchema), UserController.register);
UserRoutes.get('/me', authenticateMiddleware, UserController.me);