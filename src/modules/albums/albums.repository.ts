import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../prisma/client";
import { AlbumsRepositoryContract } from "./types/albums.contracts";
import { AlbumCredentials, AlbumUpdateCredentials } from "./types/albums.types";
import { InternalServerError, NotFoundError, ValidationError } from "../../errors/app.errors";

const USER_SELECT = {
    select: { id: true, email: true },
};

export const AlbumsRepository: AlbumsRepositoryContract = {
    async getAlbumsByUserId(userId: number) {
        try {
            return await PrismaClient.album.findMany({
                where:   { userId },
                orderBy: { id: 'desc' },
                include: {
                    user:   USER_SELECT,
                    photos: true,
                },
            }) as any;
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async createAlbum(userId: number, data: AlbumCredentials) {
        try {
            const { photos, ...albumData } = data;

            await PrismaClient.album.create({
                data: {
                    ...albumData,
                    userId,
                    photos: {
                        create: photos && photos.length > 0 ? photos : [],
                    },
                },
            });

            return { message: "ALBUM_CREATED" };
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            console.log(error)
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async updateAlbum(albumId: number, userId: number, data: AlbumUpdateCredentials) {
    try {
        const album = await PrismaClient.album.findFirst({
            where: { id: albumId, userId },
        });
        if (!album) {
            throw new NotFoundError('Album');
        }
        const { photos, ...albumData } = data;
        const updatedAlbum = await PrismaClient.album.update({
            where: { id: albumId },
            data: {
                ...albumData,
                ...(photos && {
                    photos: {
                        create: photos
                    }
                })
            },
            include: {
                photos: true
            }
        });
        return { 
            message: "ALBUM_UPDATED", 
            album: updatedAlbum 
        };

        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            console.error("Update Album Error:", error);
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        };
    },

    async deletePhoto(photoId: number, userId: number) {
        try {
            const result = await PrismaClient.photo.deleteMany({
                where: {
                    id: photoId,
                    album: {
                        userId: userId
                    }
                }
            });

            if (result.count === 0) {
                throw new NotFoundError('Photo not found or access denied');
            }

            return { message: "PHOTO_DELETED" };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    }
}