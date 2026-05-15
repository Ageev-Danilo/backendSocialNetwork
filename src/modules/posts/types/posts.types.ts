import { Prisma } from "../../../generated/prisma";

type PostMedia = Prisma.PostMediaGetPayload<{}>;
type Tag       = Prisma.TagGetPayload<{}>;
type PostLink  = Prisma.PostLinkGetPayload<{}>;
type PostView  = Prisma.PostViewGetPayload<{}>;

export interface PostCredentials {
    title:   string;
    content: string;
    media?:   PostMedia[];
    tags?:    Tag[];
    links?:   PostLink[];
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
    views:     PostView[];
}