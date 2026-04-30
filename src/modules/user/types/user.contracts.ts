import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type {
    LoginCredentials,
    RegisterCredentials,
    User,
    UserWithPassword,
    UserCreateInput,
    ProfileCredentials,
} from './user.types';
import { Profile } from '../../../generated/prisma';

export interface UserControllerContract {
    login(
        req: Request<object, { token: string }, LoginCredentials>,
        res: Response<{ token: string }>,
        next: NextFunction,
    ): Promise<void>;

    register(
        req: Request<object, { token: string }, RegisterCredentials>,
        res: Response<{ token: string }>,
        next: NextFunction,
    ): Promise<void>;

    me(
        req: Request<object, User, object, object, AuthenticatedUser>,
        res: Response<User, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    updateProfile(
        req: Request<object, any, ProfileCredentials, object, AuthenticatedUser>,
        res: Response<any, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
}

export interface UserServiceContract {
    login(dto: LoginCredentials): Promise<{ token: string }>;
    register(dto: RegisterCredentials & { avatar?: string }): Promise<{ token: string }>;
    me(dto: { userId: number }): Promise<User>;
    updateProfile(dto: { userId: number }, data: ProfileCredentials): Promise<Profile>;
}

export interface UserRepositoryContract {
    findByEmailWithPassword(email: string): Promise<UserWithPassword | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: UserCreateInput): Promise<User>;
    findById(id: number): Promise<User>;
    updateProfile(id: number, data: ProfileCredentials): Promise<Profile>;
}