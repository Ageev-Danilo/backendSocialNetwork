import type { NextFunction, Request, Response } from "express";
import type { PostCredentials, Post } from "./posts.types";


export interface PostsControlleContract {
    getAllPost(
        req: Request<object, Post[], object, object>,
        res: Response<Post[]>,
        next: NextFunction,

    ): Promise<void>;
    getPostById(
        req: Request<object, Post[], object, object>,
        res: Response<Post[]>,
        next: NextFunction,
    ): Promise<void>;
    createPost(
        req: Request<object, {message: string}, PostCredentials, object>,
        res: Response<{message: string}>,
        next: NextFunction,
    ): Promise<void>;
}

export interface PostsServiceContract {
    getAllPost(

    ): Promise<Post[]>;
    getPostById(
        dto: { userId: number }
    ): Promise<Post[]>;
    createPost(
        dto: PostCredentials, userId: number
    ): Promise<{message: string}>
}

export interface PostsRepositoryContract {
    getAllPost(

    ): Promise<Post[]>;
    getPostById(
        userId: number
    ): Promise<Post[]>;
    createPost(
        userId: number,
        data: PostCredentials,
    ): Promise<{message: string}>
}
