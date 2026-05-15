import { SettingsRepository } from './settings.repository';
import { SettingsCredentials } from './types/settings.types';

export const SettingsService = {
    async getSettings(dto: { userId: number }) {
        const profile = await SettingsRepository.findByUserId(dto.userId);
        return profile ?? null;
    },

    async updateSettings(userId: number, dto: SettingsCredentials) {
        await SettingsRepository.update(userId, dto);
        return { message: 'Settings updated' };
    },
};