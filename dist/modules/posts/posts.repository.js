"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const client_1 = require("@prisma/client/runtime/client");
const client_2 = require("../../prisma/client");
const app_errors_1 = require("../../errors/app.errors");
const mapPost = (post) => {
    const { views, ...rest } = post;
    return {
        ...rest,
        views: Array.isArray(views) ? views.length : views ?? 0,
    };
};
const USER_SELECT = {
    select: { id: true, email: true },
};
exports.PostsRepository = {
    async getAllPost() {
        try {
            const posts = await client_2.PrismaClient.post.findMany({
                take: 5,
                orderBy: { id: 'desc' },
                include: {
                    user: USER_SELECT,
                    media: true,
                    tags: true,
                    links: true,
                    views: true,
                },
            });
            return posts.map(mapPost);
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError("WRONG_QUERY");
            }
            throw new app_errors_1.InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
    async getPostById(userId) {
        try {
            const posts = await client_2.PrismaClient.post.findMany({
                where: { userId },
                orderBy: { id: 'desc' },
                include: {
                    user: USER_SELECT,
                    media: true,
                    tags: true,
                    links: true,
                    views: true,
                },
            });
            return posts.map(mapPost);
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError("WRONG_QUERY");
            }
            throw new app_errors_1.InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
    async createPost(userId, data) {
        try {
            const { media, tags, links, ...postData } = data;
            const createData = { ...postData, userId };
            if (media?.length) {
                createData.media = {
                    create: media.map(({ url }) => ({ url })),
                };
            }
            if (tags?.length) {
                createData.tags = {
                    connectOrCreate: tags.map(({ name }) => ({
                        where: { name },
                        create: { name },
                    })),
                };
            }
            if (links?.length) {
                createData.links = {
                    create: links.map(({ url }) => ({ url })),
                };
            }
            await client_2.PrismaClient.post.create({ data: createData });
            return { message: "POST_CREATED" };
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError) {
                throw new app_errors_1.ValidationError("WRONG_QUERY");
            }
            throw new app_errors_1.InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },
};
//# sourceMappingURL=posts.repository.js.map