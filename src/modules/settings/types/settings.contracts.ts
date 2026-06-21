import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import { SettingsCredentials, UpdateEmailDto, UpdatePasswordDto } from './settings.types';

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

    updateEmail(
        req: Request<object, { message: string }, UpdateEmailDto, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next: NextFunction,
    ): Promise<void>;

    updatePassword(
        req: Request<object, { message: string }, UpdatePasswordDto, object, AuthenticatedUser>,
        res: Response<{ message: string }>,
        next: NextFunction,
    ): Promise<void>;
}

export interface SettingsServiceContract {
    getSettings(dto: { userId: number }): Promise<any>;
    updateSettings(userId: number, dto: SettingsCredentials): Promise<{ message: string }>;
    updateEmail(userId: number, dto: UpdateEmailDto): Promise<{ message: string }>;
    updatePassword(userId: number, dto: UpdatePasswordDto): Promise<{ message: string }>;
}

export interface SettingsRepositoryContract {
    findByUserId(userId: number): Promise<any>;
    update(userId: number, data: SettingsCredentials): Promise<any>;
    updateEmail(userId: number, email: string): Promise<void>;
    updatePassword(userId: number, hashedPassword: string): Promise<void>;
}