import { cleanEnv, str, num } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    JWT_SECRET: str(),
    PORT: num({ default: 3000 }),
});