import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaClient } from '../../prisma/client';
import { PostsRepositoryContract } from './types/posts.contracts';
import { InternalServerError, ValidationError } from '../../errors/app.errors';

const mapPost = (post: any) => {
  const { views, ...rest } = post;
  return {
    ...rest,
    likes: 0,
    views: Array.isArray(views) ? views.length : (views ?? 0),
  };
};

const USER_SELECT = {
    select: { id: true, email: true },
};

export const PostsRepository: PostsRepositoryContract = {
    async getAllPost() {
    try {
    const posts = await PrismaClient.post.findMany({
        take: 5,
        orderBy: { id: 'desc' },
        include: {
        user: USER_SELECT,
        media: true,
        tags: true,
        views: true,
        },
    });
        return posts.map(mapPost);
    } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
        throw new ValidationError('WRONG_QUERY');
    }
    throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
    }
},

async getPostById(userId: number) {
    try {
        const posts = await PrismaClient.post.findMany({
            where:   { userId },
            orderBy: { id: 'desc' },
            include: {
                user:  USER_SELECT,
                media: true,
                tags:  true,
                links: true,  
            },
        });
        return posts.map(mapPost);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw new ValidationError('WRONG_QUERY');
        }
        throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
    }
},

    async createPost(userId: number, data) {
        try {
            const { media, tags, ...postData } = data;
            const createData: any = { ...postData, userId };

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

            await PrismaClient.post.create({ data: createData });
            return { message: 'POST_CREATED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};
