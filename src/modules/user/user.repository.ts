import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';
import { Prisma } from '../../generated/prisma';
import type { UserRepositoryContract } from './types/user.contracts';
import type {
    ProfileCredentials,
    User,
    UserCreateInput,
    UserWithPassword,
} from './types/user.types';
import { PrismaClient } from '../../prisma/client';

const defaultData = {
    pseudonym: 'pseudonym',
    firstName: 'firstName',
    lastName: 'lastName',
    date: new Date(),
    username: 'username',
    signature: 'yoursignature',
    profileImage: 'image',
};

export const UserRepository: UserRepositoryContract & {
    getSuggestions(name: string): Promise<string>;
} = {
    async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
        try {
            return (await PrismaClient.user.findFirst({
                where: { email },
            })) as UserWithPassword | null;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async findByEmail(email: string): Promise<User | null> {
        try {
            return (await PrismaClient.user.findFirst({
                where: { email },
                omit: { password: true },
            })) as User | null;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            console.log(error)
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async create(data: UserCreateInput): Promise<User> {
        try {
            return (await PrismaClient.user.create({
                data,
                omit: { password: true },
            })) as User;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') throw new ValidationError('TOO_MUCH_VALUES');
                if (['P2000', 'P2005', 'P2006', 'P2007'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async findById(id: number): Promise<User> {
        try {
            return (await PrismaClient.user.findFirstOrThrow({
                where: { id },
                omit: { password: true },
            })) as User;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async updateProfile(id, data) {
        try {
            return await PrismaClient.profile.upsert({
                where:  { userId: id },
                update: {
                    pseudonym:    data.pseudonym,
                    signature:    data.signature ?? '',
                    date:         data.date ?? null,
                    profileImage: data.profileImage ?? null,
                },
                create: {
                    userId:       id,
                    pseudonym:    data.pseudonym,
                    signature:    data.signature ?? '',
                    date:         data.date ?? null,
                    profileImage: data.profileImage ?? null,
                },
            });
        } catch (error) {
            console.log(error)
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
    async getSuggestions(name) {
        if (!name) {
            throw new ValidationError('Name is required');
        }
        const baseUsername =
            name
                .trim()
                .split(/\s+/)
                .map(part => part.toLowerCase().replace(/[^a-z0-9]/g, ''))
                .join('') || 'user';

        const generateCandidate = () => `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;
        let suggestion = generateCandidate();

        try {
            let exists = await PrismaClient.user.findFirst({
                where: { username: suggestion },
            });
            let attempts = 0;

            while (exists && attempts < 10) {
                suggestion = generateCandidate();
                exists = await PrismaClient.user.findFirst({
                    where: { username: suggestion },
                });
                attempts += 1;
            }

            if (exists) {
                suggestion = `${baseUsername}${Date.now().toString().slice(-4)}`;
            }

            return suggestion;
        } catch (error) {
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};