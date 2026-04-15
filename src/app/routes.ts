import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';

export const appRoutes = Router();

appRoutes.use('/users', UserRoutes);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});