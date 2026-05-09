import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { PrismaClient } from "../../prisma/client"
import { AlbumsRepositoryContract } from "./types/albums.contracts";
import { AlbumCredentials } from "./types/albums.types";
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
                include: { 
                    user: USER_SELECT,
                    photos: true 
                },
            });
        } catch (error) {
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
                    userId: 5,   
                    photos: {
                        create: photos 
                    }
                }
            });
            return { message: "ALBUM_CREATED" };
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};