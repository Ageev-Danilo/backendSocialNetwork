"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../config/env");
const routes_1 = require("./routes");
const error_handler_middleware_1 = require("../middlewares/error-handler.middleware");
const path_1 = require("../config/path");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
(0, node_fs_1.mkdirSync)((0, node_path_1.join)(path_1.uploadDir, 'original'), { recursive: true });
(0, node_fs_1.mkdirSync)((0, node_path_1.join)(path_1.uploadDir, 'thumbnail'), { recursive: true });
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/media', express_1.default.static(path_1.uploadDir));
exports.app.use(routes_1.appRoutes);
exports.app.use(error_handler_middleware_1.errorHandlerMiddleware);
exports.app.listen(env_1.env.PORT, env_1.env.HOST, () => {
    console.log(`Server running on http://${env_1.env.HOST}:${env_1.env.PORT}`);
});
