import { AlbumsRepository } from './albums.repository';
import { AlbumsServiceContract } from './types/albums.contracts';
import { AlbumCredentials, AlbumUpdateCredentials, Album } from './types/albums.types';

export const AlbumsService: AlbumsServiceContract = {
    async getAlbumsByUserId(userId: number): Promise<Album[]> {
        return await AlbumsRepository.getAlbumsByUserId(userId);
    },

    async createAlbum(userId: number, dto: AlbumCredentials): Promise<{ message: string }> {
        return await AlbumsRepository.createAlbum(userId, dto);
    },

    async updateAlbum(albumId: number, userId: number, dto: AlbumUpdateCredentials): Promise<{ message: string }> {
        return await AlbumsRepository.updateAlbum(albumId, userId, dto);
    },

    async deletePhoto(photoId: number, userId: number): Promise<{ message: string }> {
        return await AlbumsRepository.deletePhoto(photoId, userId);
    },
};