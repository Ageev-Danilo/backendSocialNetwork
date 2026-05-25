import { PrismaClient } from '../../prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { InternalServerError, ValidationError } from '../../errors/app.errors';
import { SettingsCredentials } from './types/settings.types';
import { SettingsRepositoryContract } from './types/settings.contracts';

export const SettingsRepository: SettingsRepositoryContract = {
    async findByUserId(userId) {
        try {
            const user = await PrismaClient.user.findUnique({
                where:   { id: userId },
                include: { profile: true },
            });
            if (!user) return null;

            return {
                id:               user.profile?.id ?? null,
                userId:           user.id,
                firstName:        user.firstName   ?? '',
                lastName:         user.lastName    ?? '',
                username:         user.username    ?? '',
                pseudonym:        user.profile?.pseudonym        ?? '',
                date:             user.profile?.date             ?? '',
                signature:        user.profile?.signature        ?? '',
                profileImage:     user.profile?.profileImage     ?? null,
                isImageSignature: user.profile?.isImageSignature ?? false,
                isTextSignature:  user.profile?.isTextSignature  ?? true,
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async update(userId, data) {
        try {
            await PrismaClient.user.update({
                where: { id: userId },
                data:  {
                    firstName: data.firstName,
                    lastName:  data.lastName,
                    username:  data.username,
                },
            });

            const profilePayload: any = {
                pseudonym:        data.pseudonym,
                isImageSignature: data.isImageSignature,
                isTextSignature:  data.isTextSignature,
            };
            if (data.date         !== undefined) profilePayload.date         = data.date;
            if (data.profileImage !== undefined) profilePayload.profileImage = data.profileImage;
            if (data.signature    !== undefined && data.signature !== null)
                profilePayload.signature = data.signature;

            return await PrismaClient.profile.upsert({
                where:  { userId },
                create: {
                    userId,
                    pseudonym:        data.pseudonym,
                    signature:        data.signature        ?? '',
                    date:             data.date             ?? null,
                    profileImage:     data.profileImage     ?? null,
                    isImageSignature: data.isImageSignature,
                    isTextSignature:  data.isTextSignature,
                },
                update: profilePayload,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};