import type { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export const authController = {

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, username, name, surname } = req.body;

            if (!email || !password || !username || !name || !surname) {
                res.status(400).json({ message: 'Всі поля обовʼязкові' });
                return;
            }

            const result = await authService.register({
                email, password, username, name, surname,
            });
            res.status(201).json(result);
        } catch (err) {
            if (err instanceof Error && err.message === 'USER_EXISTS') {
                res.status(409).json({ message: 'Користувач вже існує' });
                return;
            }
            next(err);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email і пароль обовʼязкові' });
                return;
            }

            const result = await authService.login({ email, password });
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
                res.status(401).json({ message: 'Невірний email або пароль' });
                return;
            }
            next(err);
        }
    },

    async me(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).userId as number;
            const user = await authService.me(userId);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof Error && err.message === 'NOT_FOUND') {
                res.status(404).json({ message: 'Користувача не знайдено' });
                return;
            }
            next(err);
        }
    },
};