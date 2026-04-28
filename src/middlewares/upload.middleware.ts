import { NextFunction, Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import { join } from 'node:path';
import sharp from 'sharp';
import { BadRequestError } from '../errors/app.errors';
import { originalFilesDir, thumbnailFilesDir } from '../config/path';

export const uploadMiddleware = multer({ storage: memoryStorage() });

export function processImageMiddleware(isRequired: boolean, width: number, quality: number = 80) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const file = req.file;

            if (!file) {
                if (isRequired) next(new BadRequestError('No uploaded image!'));
                else next();
                return;
            }

            const filename = `${Date.now()}.jpeg`;
            const originalFilePath  = join(originalFilesDir,  filename);
            const thumbnailFilePath = join(thumbnailFilesDir, filename);

            await sharp(file.buffer).jpeg({ quality: 100 }).toFile(originalFilePath);
            await sharp(file.buffer).jpeg({ quality }).resize({ width }).toFile(thumbnailFilePath);

            file.filename = filename;
            next();
        } catch (error) {
            next(error);
        }
    };
}