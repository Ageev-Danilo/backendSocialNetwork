"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsRouter = void 0;
const express_1 = require("express");
const albums_controller_1 = require("./albums.controller");
exports.AlbumsRouter = (0, express_1.Router)();
exports.AlbumsRouter.get('/my-albums', albums_controller_1.AlbumsController.getAlbumsByUserId);
//  authenticateMiddleware, 
exports.AlbumsRouter.post('/create-album', albums_controller_1.AlbumsController.createAlbum);
//# sourceMappingURL=albums.router.js.map