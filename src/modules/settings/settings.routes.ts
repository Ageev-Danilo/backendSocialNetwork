import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { SettingsController } from './settings.controller';

export const SettingsRoutes = Router();

SettingsRoutes.get('/', SettingsController.getSettings);
SettingsRoutes.post('/', authenticateMiddleware, SettingsController.updateSettings);