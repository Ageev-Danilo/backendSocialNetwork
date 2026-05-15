import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { AlbumCredentials, Album } from './albums.types';
export interface AlbumsControllerContract {
    getAlbumsByUserId(req: Request<object, Album[], object, object, AuthenticatedUser>, res: Response<Album[], AuthenticatedUser>, next: NextFunction): Promise<void>;
    createAlbum(req: Request<object, {
        message: string;
    }, AlbumCredentials, object, AuthenticatedUser>, res: Response<{
        message: string;
    }, AuthenticatedUser>, next: NextFunction): Promise<void>;
}
export interface AlbumsServiceContract {
    getAlbumsByUserId(userId: number): Promise<Album[]>;
    createAlbum(userId: number, dto: AlbumCredentials): Promise<{
        message: string;
    }>;
}
export interface AlbumsRepositoryContract {
    getAlbumsByUserId(userId: number): Promise<Album[]>;
    createAlbum(userId: number, data: AlbumCredentials): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=albums.contracts.d.ts.map