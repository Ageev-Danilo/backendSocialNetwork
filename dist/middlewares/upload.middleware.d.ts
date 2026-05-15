import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
export declare const uploadMiddleware: multer.Multer;
export declare function processImageMiddleware(isRequired: boolean, width: number, quality?: number): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=upload.middleware.d.ts.map