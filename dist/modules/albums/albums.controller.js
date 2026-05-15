"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsController = void 0;
const albums_service_1 = require("./albums.service");
exports.AlbumsController = {
    async getAlbumsByUserId(req, res, next) {
        try {
            const albums = await albums_service_1.AlbumsService.getAlbumsByUserId(5);
            res.status(200).json(albums);
        }
        catch (error) {
            next(error);
        }
    },
    async createAlbum(req, res, next) {
        try {
            const result = await albums_service_1.AlbumsService.createAlbum(5, req.body);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=albums.controller.js.map