import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { AlbumCredentials, AlbumUpdateCredentials, Album } from './albums.types';

export interface AlbumsControllerContract {
    getAlbumsByUserId(
        req: Request<object, Album[], object, object, AuthenticatedUser>,
        res: Response<Album[], AuthenticatedUser>,
        next: NextFunction,  
    ): Promise<void>;

    createAlbum(
        req: Request<object, { message: string }, AlbumCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    updateAlbum(
        req: Request<{ id: string }, { message: string }, AlbumUpdateCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    deletePhoto(
        req: Request<{ photoId: string }, { message: string }, object, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
    uploadPhoto(
        req: Request<object, { path: string }, object, object, AuthenticatedUser>,
        res: Response<{ path: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
}

export interface AlbumsServiceContract {
    getAlbumsByUserId(userId: number): Promise<Album[]>;
    createAlbum(userId: number, dto: AlbumCredentials): Promise<{ message: string }>;
    updateAlbum(albumId: number, userId: number, dto: AlbumUpdateCredentials): Promise<{ message: string }>;
    deletePhoto(photoId: number, userId: number): Promise<{ message: string }>;
}

export interface AlbumsRepositoryContract {
    getAlbumsByUserId(userId: number): Promise<Album[]>;
    createAlbum(userId: number, data: AlbumCredentials): Promise<{ message: string }>;
    updateAlbum(albumId: number, userId: number, data: AlbumUpdateCredentials): Promise<{ message: string }>;
    deletePhoto(photoId: number, userId: number): Promise<{ message: string }>;
}