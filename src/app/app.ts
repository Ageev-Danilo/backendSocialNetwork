import express from 'express';
import cors from 'cors';
import { env } from '../config/env';
import { appRoutes } from './routes';
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware';
import { mailRouter } from '../modules/mail/mail.router';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(appRoutes);
app.use(errorHandlerMiddleware);
app.use(mailRouter)

app.listen(env.PORT, env.HOST, () => {
    console.log(`Server running on http://${env.HOST}:${env.PORT}`);
});