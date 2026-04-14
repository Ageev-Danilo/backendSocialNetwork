import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';
import { PrismaClient } from '../../prisma/client';
import type { UserRepositoryContract } from './types/user.contracts';
import type { User, UserCreateInput, UserWithPassword } from './types/user.types';

export const UserRepository: UserRepositoryContract = {

    async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
        try {
            return await PrismaClient.user.findFirst({
                where: { email },
            }) as UserWithPassword | null;
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
            return await PrismaClient.user.findFirst({
                where: { email },
                omit: { password: true },
            }) as User | null;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async create(data: UserCreateInput): Promise<User> {
        try {
            return await PrismaClient.user.create({ data }) as User;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ValidationError('TOO_MUCH_VALUES');
                }
                if (['P2000', 'P2005', 'P2006', 'P2007'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async findById(id: number): Promise<User> {
        try {
            return await PrismaClient.user.findFirstOrThrow({
                where: { id },
                omit: { password: true },
            }) as User;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};