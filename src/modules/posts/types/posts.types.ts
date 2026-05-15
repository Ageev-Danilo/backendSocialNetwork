import { Prisma } from "../../../generated/prisma";

type PostMedia = Prisma.PostMediaGetPayload<{}>;
type Tag     = Prisma.TagGetPayload<{}>;

export interface PostCredentials {
    title:   string;
    content: string;
    link?:   string;
    media:   PostMedia[];
    tags:    Tag[];
}

export interface Post {
    id:      number;
    title:   string;
    content: string;
    link:    string | null;
    userId:  number;
    user:    { id: number; email: string };
    media:   PostMedia[];
    tags:    Tag[];
    likes:   number;
    views:   number;
}