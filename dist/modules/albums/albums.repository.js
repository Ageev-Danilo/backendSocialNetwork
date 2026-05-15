"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsRepository = void 0;
const client_1 = require("@prisma/client/runtime/client");
const client_2 = require("../../prisma/client");
const app_errors_1 = require("../../errors/app.errors");
const PROFILE_SELECT = {
    select: { id: true, pseudonym: true },
};
exports.AlbumsRepository = {
    async getAlbumsByUserId(userId) {
        try {
            const profile = await client_2.PrismaClient.profile.findUnique({
                where: { userId },
            });
            if (!profile)
                return [];
            return await client_2.PrismaClient.album.findMany({
                where: { profileId: profile.id },
                orderBy: { id: 'desc' },
                include: {
                    profile: PROFILE_SELECT,
                    images: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError("WRONG_QUERY");
            }
            throw new app_errors_1.InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
    async createAlbum(userId, data) {
        try {
            const profile = await client_2.PrismaClient.profile.findUnique({
                where: { userId },
            });
            if (!profile)
                throw new app_errors_1.ValidationError("PROFILE_NOT_FOUND");
            const { images, ...albumData } = data;
            await client_2.PrismaClient.album.create({
                data: {
                    ...albumData,
                    profileId: profile.id,
                    ...(images ? { images: { create: images } } : {}),
                },
            });
            return { message: "ALBUM_CREATED" };
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError("WRONG_QUERY");
            }
            throw new app_errors_1.InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};
//# sourceMappingURL=albums.repository.js.map