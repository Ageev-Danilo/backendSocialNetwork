import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';

export interface SettingsControllerContract {
    getSettings(
        req: Request<object, any, object, object, AuthenticatedUser>,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    updateSettings(
        req: Request<object, { message: string }, any, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next: NextFunction,
    ): Promise<void>;
}

export interface SettingsServiceContract {
    getSettings(dto: { userId: number }): Promise<any>;
    updateSettings(dto: any): Promise<{ message: string }>;
}

export interface SettingsRepositoryContract {
    findByUserId(userId: number): Promise<any>;
    update(userId: number, data: any): Promise<any>;
}