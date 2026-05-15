import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'yup';
export declare function validateMiddleware(schema: ObjectSchema<any>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validate.middleware.d.ts.map