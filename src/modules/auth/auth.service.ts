import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma';
import { env } from '../../env';

export const authService = {

    async register(data: {
        email: string;
        password: string;
        username: string;
        name: string;
        surname: string;
    }) {
        const existing = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            throw new Error('USER_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                profile: {
                    create: {
                        pseudonym: data.username,
                        username: data.username,
                        firstName: data.name,
                        lastName: data.surname,
                        date: new Date(),
                    },
                },
            },
            include: { profile: true },
        });

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return { token };
    },

    async login(data: { email: string; password: string }) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return { token };
    },

    async me(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
            omit: { password: true },
        });
        if (!user) {
            throw new Error('NOT_FOUND');
        }
        return user;
    },
};