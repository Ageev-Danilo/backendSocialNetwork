"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRouter = void 0;
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middlewares/authenticate.middleware");
const posts_controller_1 = require("./posts.controller");
exports.PostsRouter = (0, express_1.Router)();
exports.PostsRouter.get('/main', authenticate_middleware_1.authenticateMiddleware, posts_controller_1.PostController.getAllPost);
exports.PostsRouter.get('/my-posts', authenticate_middleware_1.authenticateMiddleware, posts_controller_1.PostController.getPostById);
exports.PostsRouter.post('/create-post', authenticate_middleware_1.authenticateMiddleware, posts_controller_1.PostController.createPost);
//# sourceMappingURL=posts.router.js.map