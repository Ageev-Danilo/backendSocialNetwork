import { Router } from 'express';
import { mailController } from './mail.controller';

export const mailRouter = Router();

mailRouter.post('/send-verification', mailController.sendVerificationCode);