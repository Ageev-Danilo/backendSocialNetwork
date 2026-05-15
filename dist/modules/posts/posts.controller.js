"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const posts_service_1 = require("./posts.service");
exports.PostController = {
    async getAllPost(req, res, next) {
        try {
            const posts = await posts_service_1.PostsService.getAllPost();
            res.status(200).json(posts);
        }
        catch (error) {
            next(error);
        }
    },
    async getPostById(req, res, next) {
        try {
            const userPosts = await posts_service_1.PostsService.getPostById({ userId: res.locals.userId });
            res.status(200).json(userPosts);
        }
        catch (error) {
            next(error);
        }
    },
    async createPost(req, res, next) {
        try {
            const result = await posts_service_1.PostsService.createPost(res.locals.userId, req.body);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=posts.controller.js.map