import { AlbumsRepository } from './albums.repository';
import { AlbumsServiceContract } from './types/albums.contracts';
import { AlbumCredentials, Album } from './types/albums.types';

export const AlbumsService: AlbumsServiceContract = {
    async getAlbumsByUserId(userId: number): Promise<Album[]> {
        return await AlbumsRepository.getAlbumsByUserId(userId);
    },

    async createAlbum(userId: number, dto: AlbumCredentials): Promise<{ message: string }> {
        return await AlbumsRepository.createAlbum(userId, dto);
    }
};