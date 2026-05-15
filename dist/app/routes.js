"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const settings_routes_1 = require("../modules/settings/settings.routes");
const mail_router_1 = require("../modules/mail/mail.router");
const posts_router_1 = require("../modules/posts/posts.router");
// import { AuthRoutes } from '../modules/auth/auth.routes';
const albums_router_1 = require("../modules/albums/albums.router");
exports.appRoutes = (0, express_1.Router)();
// appRoutes.use('/auth', AuthRoutes);
exports.appRoutes.use('/albums', albums_router_1.AlbumsRouter);
exports.appRoutes.use('/users', user_routes_1.userRoutes);
exports.appRoutes.use('/settings', settings_routes_1.SettingsRoutes);
exports.appRoutes.use('/mail', mail_router_1.mailRouter);
exports.appRoutes.use('/posts', posts_router_1.PostsRouter);
exports.appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});
//# sourceMappingURL=routes.js.map