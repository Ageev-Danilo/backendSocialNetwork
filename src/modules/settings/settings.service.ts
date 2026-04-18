import { NotFoundError } from '../../errors/app.errors';
import { SettingsRepository } from './settings.repository';

export const SettingsService = {

    async getSettings(dto: { userId: number }) {
        const profile = await SettingsRepository.findByUserId(dto.userId);

        if (!profile) {
            throw new NotFoundError('Profile');
        }

        return profile;
    },

    async updateSettings(dto: any) {
        const profile = await SettingsRepository.findByUserId(dto.userId);

        if (!profile) {
            throw new NotFoundError('Profile');
        }

        await SettingsRepository.update(dto.userId, dto);

        return { message: 'Settings updated' };
    },
};