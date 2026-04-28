import express from 'express';
import cors from 'cors';
import { env } from '../config/env';
import { appRoutes } from './routes';
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware';
import { uploadDir } from '../config/path';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

mkdirSync(join(uploadDir, 'original'),  { recursive: true });
mkdirSync(join(uploadDir, 'thumbnail'), { recursive: true });

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/media', express.static(uploadDir)); 
app.use(appRoutes);
app.use(errorHandlerMiddleware);

app.listen(env.PORT, env.HOST, () => {
    console.log(`Server running on http://${env.HOST}:${env.PORT}`);
});