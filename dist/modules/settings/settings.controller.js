"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("./settings.service");
exports.SettingsController = {
    async getSettings(req, res, next) {
        try {
            const data = await settings_service_1.SettingsService.getSettings({ userId: res.locals.userId });
            res.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    },
    async updateSettings(req, res, next) {
        try {
            const avatar = req.file?.filename ?? req.body.avatar ?? null;
            const result = await settings_service_1.SettingsService.updateSettings(res.locals.userId, { ...req.body, avatar });
            console.log(res.locals.userId);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    },
};
//# sourceMappingURL=settings.controller.js.map