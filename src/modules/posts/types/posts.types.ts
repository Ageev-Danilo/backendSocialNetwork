import { Prisma } from "../../../generated/prisma";

type profileMedia = Prisma.PostMediaGetPayload<{
    
}>;

type Tag = Prisma.TagGetPayload<{}>

export interface PostCredentials {
    title: string;
    content: string;
    date: Date;
    media: profileMedia[];
    tags: Tag[];
}

export interface Post {
    title: string;
    content: string;
    date: Date;
    media: profileMedia[];
    tags: Tag[];
    likes: number;
    views: number;
}