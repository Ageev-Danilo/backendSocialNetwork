import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import type { AlbumCredentials, Album } from './types/albums.types';
import { AlbumsService } from './albums.service'
import { AlbumsControllerContract } from "./types/albums.contracts";

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
};