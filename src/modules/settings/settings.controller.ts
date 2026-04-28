import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import { SettingsService } from './settings.service';
import type { SettingsCredentials } from './types/settings.types';

export const SettingsController = {
    async getSettings(
        req: Request<object, any, object, object, AuthenticatedUser>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await SettingsService.getSettings({ userId: res.locals.userId });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async updateSettings(
        req: Request<object, { message: string }, SettingsCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next: NextFunction,
    ) {
        try {
            const profileImage = req.file?.filename ?? req.body.profileImage ?? null;

            const result = await SettingsService.updateSettings(
                res.locals.userId,
                { ...req.body, profileImage },
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};