"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const app_errors_1 = require("../../errors/app.errors");
const settings_repository_1 = require("./settings.repository");
exports.SettingsService = {
    async getSettings(dto) {
        const profile = await settings_repository_1.SettingsRepository.findByUserId(dto.userId);
        if (!profile) {
            throw new app_errors_1.NotFoundError('Profile');
        }
        return profile;
    },
    async updateSettings(userId, dto) {
        // const user = await SettingsRepository.findByUserId(userId);
        // if (!user) {
        //      throw new NotFoundError('User');
        // }
        await settings_repository_1.SettingsRepository.update(userId, dto);
        return { message: 'Settings updated' };
    },
};
//# sourceMappingURL=settings.service.js.map