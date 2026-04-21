import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { mailRouter } from '../modules/mail/mail.router';

export const appRoutes = Router();

appRoutes.use('/users', UserRoutes);
appRoutes.use('/mail', mailRouter);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});