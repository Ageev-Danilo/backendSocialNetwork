import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware'
import { AlbumsController } from './albums.controller';

export const AlbumsRouter = Router();

AlbumsRouter.get('/my-albums', authenticateMiddleware, AlbumsController.getAlbumsByUserId)
AlbumsRouter.post('/create-album', AlbumsController.createAlbum)