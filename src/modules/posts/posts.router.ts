import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';

export const PostsRouter = Router();

PostsRouter.get('/main', authenticateMiddleware)
PostsRouter.get('/my-posts', authenticateMiddleware)
PostsRouter.post('/create-post', authenticateMiddleware)

