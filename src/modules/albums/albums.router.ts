import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { AlbumsController } from './albums.controller';
import { uploadMiddleware, processImageMiddleware } from '../../middlewares/upload.middleware';

export const AlbumsRouter = Router();

AlbumsRouter.get('/my-albums',         authenticateMiddleware, AlbumsController.getAlbumsByUserId);
AlbumsRouter.post('/create-album',     authenticateMiddleware, AlbumsController.createAlbum);
AlbumsRouter.patch('/update/:id',      authenticateMiddleware, AlbumsController.updateAlbum);
AlbumsRouter.delete('/photo/:photoId', authenticateMiddleware, AlbumsController.deletePhoto);
AlbumsRouter.post('/upload-photo',     authenticateMiddleware, uploadMiddleware.single('photo'), processImageMiddleware(true, 800), AlbumsController.uploadPhoto);