import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';

import { SettingsCredentials } from './settings.types';

export interface SettingsControllerContract {
    getSettings(
        req: Request<object, any, object, object, AuthenticatedUser>,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    updateSettings(
        req: Request<object, { message: string }, SettingsCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next: NextFunction,
    ): Promise<void>;
}

export interface SettingsServiceContract {
    getSettings(dto: { userId: number }): Promise<any>;
    updateSettings(dto: SettingsCredentials): Promise<{ message: string }>;
}

export interface SettingsRepositoryContract {
    findByUserId(userId: number): Promise<any>;
    update(userId: number, data: SettingsCredentials): Promise<any>;
}