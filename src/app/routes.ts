import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
    
export const appRoutes = Router();

appRoutes.use('/users', UserRoutes);
appRoutes.use('/settings', SettingsRoutes);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});