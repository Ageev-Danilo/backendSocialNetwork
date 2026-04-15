import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'yup';
import { ValidationError } from '../errors/app.errors';

export function validateMiddleware(schema: ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error: any) {
            next(new ValidationError(error.errors?.join(', ') ?? 'Validation failed'));
        }
    };
}