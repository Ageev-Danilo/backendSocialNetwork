import { Router, type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { authController } from './auth.controller';

export const authRouter = Router();

function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Токен відсутній' });
        return;
    }

    const parts = authHeader.split(' ');
    const token = parts[1];

    if (!token) {
        res.status(401).json({ message: 'Токен відсутній' });
        return;
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as unknown as { userId: number };
        (req as any).userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Невалідний або протермінований токен' });
    }
}

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/me', requireAuth, authController.me);