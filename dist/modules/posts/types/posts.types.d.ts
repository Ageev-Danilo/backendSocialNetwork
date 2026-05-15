import { Prisma } from "../../../generated/prisma";
type PostMedia = Prisma.PostMediaGetPayload<{}>;
type Tag = Prisma.TagGetPayload<{}>;
type PostLink = Prisma.PostLinkGetPayload<{}>;
export interface PostCredentials {
    title: string;
    content: string;
    links?: {
        url: string;
    }[];
    media: PostMedia[];
    tags: Tag[];
}
export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    userId: number;
    user: {
        id: number;
        email: string;
    };
    media: PostMedia[];
    tags: Tag[];
    links: PostLink[];
    views: number;
}
export {};
//# sourceMappingURL=posts.types.d.ts.map