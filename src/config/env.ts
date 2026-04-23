import { cleanEnv, num, str } from 'envalid';
import { config } from 'dotenv';

config();

export const env = cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    HOST: str({ default: '0.0.0.0' }),
    DATABASE_URL: str(),
    SECRET_KEY: str(),
    TOKEN_TTL: str({ default: '7d' }),
});