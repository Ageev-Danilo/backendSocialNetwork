import type { Request, Response, NextFunction } from 'express';
import { mailService } from './mail.service';

export const mailController = {
    async sendVerificationCode(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { email } = req.body as { email?: string };

            if (!email) {
                res.status(400).json({ message: 'Email обовʼязковий' });
                return;
            }
                 console.log(email)

            const code = await mailService.sendVerificationCode(email);
            res.status(200).json({ code });
            console.log(code)
        } catch (error) {
            next(error);
        }
    },
};