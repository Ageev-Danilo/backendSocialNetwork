import { PrismaClient } from '../../../prisma/client';


export type PostMedia = {
    id:     number;
    url:    string;
    postId: number;
};

export type Tag = {
    id:   number;
    name: string;
};

export type PostLink = {
    id:     number;
    url:    string;
    postId: number;
};

export type PostView = {
    id:     number;
    userId: number;
    postId: number;
};

export interface PostCredentials {
    title:   string;
    content: string;
    media?:  PostMedia[];
    tags?:   Tag[];
    links?:  PostLink[];
}

export interface Post {
    id:        number;
    title:     string;
    content:   string;
    createdAt: Date;
    userId:    number;
    user:      { id: number; email: string };
    media:     PostMedia[];
    tags:      Tag[];
    links:     PostLink[];
    views:     number;
    likes:     number;
}

