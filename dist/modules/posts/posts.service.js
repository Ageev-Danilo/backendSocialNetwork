"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const app_errors_1 = require("../../errors/app.errors");
const user_repository_1 = require("../user/user.repository");
const posts_repository_1 = require("./posts.repository");
exports.PostsService = {
    async getAllPost() {
        const posts = await posts_repository_1.PostsRepository.getAllPost();
        return posts;
    },
    async getPostById(dto) {
        const user = await user_repository_1.UserRepository.findById(dto.userId);
        if (!user) {
            throw new app_errors_1.NotFoundError('User');
        }
        return await posts_repository_1.PostsRepository.getPostById(dto.userId);
    },
    async createPost(userId, dto) {
        return await posts_repository_1.PostsRepository.createPost(userId, dto);
    },
};
