import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { PostController } from './posts.controller';

export const PostsRouter = Router();

PostsRouter.get('/main', authenticateMiddleware, PostController.getAllPost)
PostsRouter.get('/my-posts', authenticateMiddleware, PostController.getPostById)
PostsRouter.post('/create-post', authenticateMiddleware, PostController.createPost)