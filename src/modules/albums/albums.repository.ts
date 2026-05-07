import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { PrismaClient } from "../../prisma/client"
import { AlbumsRepositoryContract } from "./types/albums.contracts";
import { InternalServerError, ValidationError } from "../../errors/app.errors";

const USER_SELECT = {
    select: { id: true, email: true },
};

export const AlbumsRepository: AlbumsRepositoryContract = {
    async getAlbumsByUserId(userId: number) {
        try {
            return await PrismaClient.album.findMany({
                where: { userId },
                orderBy: { id: 'desc' },
                include: { user: USER_SELECT },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async createAlbum(userId: number, data: any) {
        try {
            await PrismaClient.album.create({
                data: {
                    ...data,
                    userId: 1
                }
            });
            return { message: "ALBUM_CREATED" };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};