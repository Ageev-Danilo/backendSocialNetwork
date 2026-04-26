import type { Request, Response } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import type { UserControllerContract } from './types/user.contracts';
import type { LoginCredentials, RegisterCredentials, User } from './types/user.types';
import { UserService } from './user.service';


export const UserController: UserControllerContract = {

    async login(
        req: Request<object, { token: string }, LoginCredentials>,
        res: Response<{ token: string }>,
        next,
    ) {
        try {
            const token = await UserService.login(req.body);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    },

    async register(
        req: Request<object, { token: string }, RegisterCredentials>,
        res: Response<{ token: string }>,
        next,
    ) {
        try {
            const token = await UserService.register(req.body);
            res.status(201).json(token);
        } catch (error) {
            next(error);
        }
    },

    async me(
        req: Request<object, User, object, object, AuthenticatedUser>,
        res: Response<User, AuthenticatedUser>,
        next,
    ) {
        try {
            const me = await UserService.me({ userId: res.locals.userId });
            res.status(200).json(me);
        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const updatedUser = await UserService.updateProfile(
                { userId: 1 },
                req.body,
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    },
};