"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnailFilesDir = exports.originalFilesDir = exports.uploadDir = void 0;
const node_path_1 = require("node:path");
exports.uploadDir = (0, node_path_1.join)(__dirname, '../../media');
exports.originalFilesDir = (0, node_path_1.join)(exports.uploadDir, './original');
exports.thumbnailFilesDir = (0, node_path_1.join)(exports.uploadDir, './thumbnail');
//# sourceMappingURL=path.js.map