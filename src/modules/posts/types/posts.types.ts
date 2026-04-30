import { Prisma } from "../../../generated/prisma";

type profileMedia = Prisma.PostMediaGetPayload<{
    
}>;

type Tag = Prisma.TagGetPayload<{}>

export interface PostCredentials {
    // id      Int      @id @default(autoincrement())
    // title   String
    // content String
    // date    DateTime @default(now())
    // link    String?

    // userId Int
    // user   User    @relation(fields: [userId], references: [id])

    // media  PostMedia[]

    // albums Album[] @relation("PostAlbums")

    // likes  User[]  @relation("PostLikes")
    // views  User[]  @relation("PostViews")

    // tags   Tag[]

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