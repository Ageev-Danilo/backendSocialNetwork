"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
exports.processImageMiddleware = processImageMiddleware;
const multer_1 = __importStar(require("multer"));
const node_path_1 = require("node:path");
const sharp_1 = __importDefault(require("sharp"));
const app_errors_1 = require("../errors/app.errors");
const path_1 = require("../config/path");
exports.uploadMiddleware = (0, multer_1.default)({ storage: (0, multer_1.memoryStorage)() });
function processImageMiddleware(isRequired, width, quality = 80) {
    return async function (req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                if (isRequired)
                    next(new app_errors_1.BadRequestError('No uploaded image!'));
                else
                    next();
                return;
            }
            const filename = `${Date.now()}.jpeg`;
            const originalFilePath = (0, node_path_1.join)(path_1.originalFilesDir, filename);
            const thumbnailFilePath = (0, node_path_1.join)(path_1.thumbnailFilesDir, filename);
            await (0, sharp_1.default)(file.buffer).jpeg({ quality: 100 }).toFile(originalFilePath);
            await (0, sharp_1.default)(file.buffer).jpeg({ quality }).resize({ width }).toFile(thumbnailFilePath);
            file.filename = filename;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
