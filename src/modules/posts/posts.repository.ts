import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../prisma/client";
import { PostsRepositoryContract } from "./types/posts.contracts";
import { InternalServerError, ValidationError } from "../../errors/app.errors";

const mapPost = (post: any) => {
    const { likes, views, ...rest } = post;

    return {
        ...rest,
        likes: Array.isArray(likes) ? likes.length : likes ?? 0,
        views: Array.isArray(views) ? views.length : views ?? 0,
    };
};

export const PostsRepository: PostsRepositoryContract = {
    async getAllPost() {
        try {
            const posts = await PrismaClient.post.findMany({
                include: {
                    media: true,
                    tags: true,
                    likes: true,
                    views: true,
                },
            });

            return posts.map(mapPost);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            console.log(error)
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
    async getPostById(id: number) {
        try {
            const posts = await PrismaClient.post.findMany({
                where: {
                    id,
                },
                include: {
                    media: true,
                    tags: true,
                    likes: true,
                    views: true,
                },
            });
            console.log(id)
            return posts.map(mapPost);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            console.log(error)
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
    async createPost(userId: number, data) {
        try {
            const { media, tags, ...postData } = data;
            const createData: any = {
                ...postData,
                userId,
            };

            // if (media?.length) {
            //     createData.media = {
            //         create: media.map(({ url }) => ({
            //             url,
            //         })),
            //     };
            // }

            // if (tags?.length) {
            //     createData.tags = {
            //         create: tags.map(({ name }) => ({
            //             name,
            //         })),
            //     };
            // }

            await PrismaClient.post.create({
                data: createData,
            });

            return {
                message: "POST_CREATED",
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError("WRONG_QUERY");
            }
            console.log(error)
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};