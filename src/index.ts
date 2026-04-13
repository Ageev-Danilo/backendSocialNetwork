import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './env';
import { prisma } from './prisma';
import { authRouter } from './modules/auth/auth.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', authRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
});

async function main() {
    await prisma.$connect();
    app.listen(env.PORT, () => {
        console.log(`Server running on http://localhost:${env.PORT}`);
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});