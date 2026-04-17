import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import { SettingsService } from './settings.service';

export const SettingsController = {

    async getSettings(
        req: Request<object, any, object, object, AuthenticatedUser>,
        res: Response,
        next,
    ) {
        try {
            const data = await SettingsService.getSettings({ userId: res.locals.userId });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async updateSettings(
        req: Request<object, { message: string }, any, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next,
    ) {
        try {
            const result = await SettingsService.updateSettings({
                userId: res.locals.userId,
                ...req.body,
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};