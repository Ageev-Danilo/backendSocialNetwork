import { PrismaClient } from '../../prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';

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

    async update(userId: number, data: any) {
        try {
            return await PrismaClient.profile.update({
                where: { userId },
                data,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};