import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { uploadMiddleware, processImageMiddleware } from '../../middlewares/upload.middleware';
import { SettingsController } from './settings.controller';

export const SettingsRoutes = Router();

SettingsRoutes.get('/', authenticateMiddleware, SettingsController.getSettings);

SettingsRoutes.post(
    '/',
   
    uploadMiddleware.single('profileImage'), 
    processImageMiddleware(false, 400, 85),
    SettingsController.updateSettings,
);