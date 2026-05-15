"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middlewares/authenticate.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const settings_controller_1 = require("./settings.controller");
exports.SettingsRoutes = (0, express_1.Router)();
exports.SettingsRoutes.get('/', authenticate_middleware_1.authenticateMiddleware, settings_controller_1.SettingsController.getSettings);
exports.SettingsRoutes.post('/', authenticate_middleware_1.authenticateMiddleware, upload_middleware_1.uploadMiddleware.single('avatar'), (0, upload_middleware_1.processImageMiddleware)(false, 400, 85), settings_controller_1.SettingsController.updateSettings);
//# sourceMappingURL=settings.routes.js.map