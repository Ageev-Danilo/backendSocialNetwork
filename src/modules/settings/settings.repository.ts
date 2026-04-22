import { PrismaClient } from '../../prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';
import { SettingsCredentials } from './types/settings.types';

export const SettingsRepository = {

    async findByUserId(userId: number) {
        try {
            return await PrismaClient.profile.findUnique({
                where: { userId },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async update(userId: number, data: SettingsCredentials) {
        try {
            console.log(userId)
            return await PrismaClient.profile.upsert({
                where: { userId },
                create: {
                    ...data,
                    userId,
                },
                update: data,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.log(error)
                throw new ValidationError('WRONG_QUERY');
            }
            console.log(error)
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
           
        }
    },
};