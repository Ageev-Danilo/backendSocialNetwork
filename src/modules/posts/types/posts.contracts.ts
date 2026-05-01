import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { PostCredentials, Post } from './posts.types';

export interface PostsControlleContract {
    getAllPost(
        req: Request,
        res: Response<Post[]>,
        next: NextFunction,
    ): Promise<void>;

    getPostById(
        req: Request<object, Post[], object, object, AuthenticatedUser>,
        res: Response<Post[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    createPost(
        req: Request<object, { message: string }, PostCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
}

export interface PostsServiceContract {
    getAllPost(): Promise<Post[]>;
    getPostById(dto: { userId: number }): Promise<Post[]>;
    createPost(userId: number, dto: PostCredentials): Promise<{ message: string }>;
}

export interface PostsRepositoryContract {
    getAllPost(): Promise<Post[]>;
    getPostById(userId: number): Promise<Post[]>;
    createPost(userId: number, data: PostCredentials): Promise<{ message: string }>;
}