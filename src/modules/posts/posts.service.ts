import { NotFoundError } from "../../errors/app.errors";
import { UserRepository } from "../user/user.repository";
import { PostsRepository } from "./posts.repository";
import { PostsRouter } from "./posts.router";
import { PostsServiceContract } from "./types/posts.contracts";


export const PostsService: PostsServiceContract = {
    async getAllPost() {
        const posts = await PostsRepository.getAllPost();
        return posts
    },
    async getPostById(dto: { userId: number }) {
        const user = await UserRepository.findById(dto.userId);
        if (!user) {
            throw new NotFoundError('User')
        }
        console.log(dto.userId)
        const myPosts = await PostsRepository.getPostById(dto.userId);
        return myPosts
    },
    async createPost(userId, dto ) {
        const createPosts = await PostsRepository.createPost(userId, dto);
        return { message: 'Post created' }
    }
}