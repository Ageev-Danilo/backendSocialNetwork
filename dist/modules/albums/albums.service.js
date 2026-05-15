"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
const albums_repository_1 = require("./albums.repository");
exports.AlbumsService = {
    async getAlbumsByUserId(userId) {
        return await albums_repository_1.AlbumsRepository.getAlbumsByUserId(userId);
    },
    async createAlbum(userId, dto) {
        return await albums_repository_1.AlbumsRepository.createAlbum(userId, dto);
    }
};
//# sourceMappingURL=albums.service.js.map