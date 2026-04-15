import type { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { AuthenticationError } from '../errors/app.errors';
import { env } from '../config/env';
import type { TokenPayload } from '../types/token.types';

export function authenticateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(new AuthenticationError('No authorization provided!'));
        return;
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
        next(new AuthenticationError('Authorization is in wrong format!'));
        return;
    }
    try {
        const userData = verify(token, env.SECRET_KEY);
        if (typeof userData === 'string') {
            next(new AuthenticationError('JWT is in wrong format!'));
            return;
        }
        res.locals.userId = (userData as TokenPayload).id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            next(new AuthenticationError('Token is expired.'));
            return;
        }
        next(error);
    }
}