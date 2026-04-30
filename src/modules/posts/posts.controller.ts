import { PostsService } from "./posts.service";
import { PostsControlleContract } from "./types/posts.contracts"


export const PostController : PostsControlleContract = {
    async getAllPost(
        req,
        res,
        next,
    ) {
        try {
            const posts = await PostsService.getAllPost();
            res.status(200).json(posts)
        } catch (error) {
            next(error);
        }
    },
    async getPostById(
        req,
        res,
        next,
    ) {
        try {
            const userPosts = await PostsService.getPostById({userId: res.locals.userId});
            res.status(200).json(userPosts)
        } catch (error) {
            next(error);
        }
    },
    async createPost(
        req,
        res,
        next,
    ) {
        try {
            const createPosts = await PostsService.createPost(res.locals.useId, {...req.body });
            res.status(200).json({
                message: 'Post have been created'
            })
        } catch (error) {
            next(error);
        }
    }
}