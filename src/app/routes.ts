import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
import { mailRouter } from '../modules/mail/mail.router';
    
export const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/settings', SettingsRoutes);
appRoutes.use('/mail', mailRouter);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});