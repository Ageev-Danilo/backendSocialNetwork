import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../prisma/client";
import { AlbumsRepositoryContract } from "./types/albums.contracts";
import { AlbumCredentials, AlbumUpdateCredentials } from "./types/albums.types";
import { InternalServerError, NotFoundError, ValidationError } from "../../errors/app.errors";

async function getOrCreateProfile(userId: number): Promise<{ id: number }> {
    let profile = await PrismaClient.profile.findUnique({
        where:  { userId },
        select: { id: true },
    });

    if (!profile) {
        profile = await PrismaClient.profile.create({
            data: {
                userId,
                pseudonym:    '',
                signature:    '',
                isImageSignature: false,
                isTextSignature:  true,
            },
            select: { id: true },
        });
    }

    return profile;
}

export const AlbumsRepository: AlbumsRepositoryContract = {
    async getAlbumsByUserId(userId: number) {
        try {
            const profile = await PrismaClient.profile.findUnique({
                where:  { userId },
                select: { id: true },
            });
            if (!profile) return [];

            return await PrismaClient.album.findMany({
                where:   { profileId: profile.id },
                orderBy: { id: 'desc' },
                include: { images: true },
            }) as any;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async createAlbum(userId: number, data: AlbumCredentials) {
        try {
            const profile = await getOrCreateProfile(userId); 

            const { images, ...albumData } = data;

            await PrismaClient.album.create({
                data: {
                    ...albumData,
                    profileId: profile.id,
                    ...(images?.length && {
                        images: { create: images },
                    }),
                },
            });

            return { message: "ALBUM_CREATED" };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async updateAlbum(albumId: number, userId: number, data: AlbumUpdateCredentials) {
        try {
            const profile = await getOrCreateProfile(userId);

            const album = await PrismaClient.album.findFirst({
                where: { id: albumId, profileId: profile.id },
            });
            if (!album) throw new NotFoundError('Album');

            const { images, ...albumData } = data;

            await PrismaClient.album.update({
                where: { id: albumId },
                data: {
                    ...albumData,
                    ...(images?.length && {
                        images: { create: images },
                    }),
                },
            });

            return { message: "ALBUM_UPDATED" };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async deletePhoto(photoId: number, userId: number) {
        try {
            const profile = await PrismaClient.profile.findUnique({
                where:  { userId },
                select: { id: true },
            });
            if (!profile) throw new NotFoundError('Profile');

            const result = await PrismaClient.albumImage.deleteMany({
                where: {
                    id:    photoId,
                    album: { profileId: profile.id },
                },
            });

            if (result.count === 0) throw new NotFoundError('Photo');

            return { message: "PHOTO_DELETED" };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};