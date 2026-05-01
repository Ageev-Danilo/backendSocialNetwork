import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import type { PostCredentials, Post } from './types/posts.types';
import { PostsService } from './posts.service';
import { PostsControlleContract } from './types/posts.contracts';

export const PostController: PostsControlleContract = {
    async getAllPost(
        req: Request,
        res: Response<Post[]>,
        next: NextFunction,
    ) {
        try {
            const posts = await PostsService.getAllPost();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },

    async getPostById(
        req: Request<object, Post[], object, object, AuthenticatedUser>,
        res: Response<Post[], AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const userPosts = await PostsService.getPostById({ userId: res.locals.userId });
            res.status(200).json(userPosts);
        } catch (error) {
            next(error);
        }
    },

    async createPost(
        req: Request<object, { message: string }, PostCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const result = await PostsService.createPost(res.locals.userId, req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
};