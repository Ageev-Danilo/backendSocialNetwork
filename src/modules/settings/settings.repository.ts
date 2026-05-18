import { PrismaClient } from '../../prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';
import { SettingsCredentials } from './types/settings.types';
import { SettingsRepositoryContract } from './types/settings.contracts';

export const SettingsRepository: SettingsRepositoryContract = {
    async findByUserId(userId) {
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

    async update(userId, data) {
        try {
            console.log(userId);

            const updatePayload: any = {
                pseudonym: data.pseudonym,
                isImageSignature: data.isImageSignature,
                isTextSignature: data.isTextSignature,
            };

            if (data.date !== undefined) updatePayload.date = data.date;
            if (data.profileImage !== undefined) updatePayload.profileImage = data.profileImage;
            if (data.signature !== undefined && data.signature !== null)
                updatePayload.signature = data.signature;

            return await PrismaClient.profile.upsert({
                where: { userId },
                create: {
                    userId,
                    pseudonym:        data.pseudonym,
                    signature:        data.signature ?? '',
                    date:             data.date ?? null,          
                    profileImage:     data.profileImage ?? null,
                    isImageSignature: data.isImageSignature,
                    isTextSignature:  data.isTextSignature,
                },
                update: updatePayload,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.log(error);
                throw new ValidationError('WRONG_QUERY');
            }
            console.log(error);
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};
