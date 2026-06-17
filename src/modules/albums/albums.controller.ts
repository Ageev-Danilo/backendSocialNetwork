import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import type { AlbumCredentials, AlbumUpdateCredentials, Album } from './types/albums.types';
import { AlbumsService } from './albums.service';
import { AlbumsControllerContract } from './types/albums.contracts';

export const AlbumsController: AlbumsControllerContract = {
    async getAlbumsByUserId(req, res, next) {
        try {
            const albums = await AlbumsService.getAlbumsByUserId(res.locals.userId);
            res.status(200).json(albums);
        } catch (error) {
            next(error);
        }
    },

    async createAlbum(req, res, next) {
        try {
            const result = await AlbumsService.createAlbum(res.locals.userId, req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async updateAlbum(req, res, next) {
        try {
            const albumId = Number(req.params.id);
            const result  = await AlbumsService.updateAlbum(albumId, res.locals.userId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async deletePhoto(req, res, next) {
        try {
            const photoId = Number(req.params.photoId);
            const result = await AlbumsService.deletePhoto(photoId, res.locals.userId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async uploadPhoto(req, res, next) {
        try {
            if (!req.file) {
                res.status(400).json({ path: '' } as any);
                return;
            }
            const relativePath = `/media/thumbnail/${req.file.filename}`;
            res.status(200).json({ path: relativePath });
        } catch (error) {
            next(error);
        }
    },
};