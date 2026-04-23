import { error } from 'node:console';
import { NotFoundError } from '../../errors/app.errors';
import { SettingsRepository } from './settings.repository';
import { SettingsCredentials } from './types/settings.types';

export const SettingsService = {

    async getSettings(dto: { userId: number }) {
        const profile = await SettingsRepository.findByUserId(dto.userId);

        if (!profile) {
            throw new NotFoundError('Profile');
        }

        return profile;
    },

    async updateSettings(userId: number, dto: SettingsCredentials) {
        // const user = await SettingsRepository.findByUserId(userId);

        // if (!user) {
        //      throw new NotFoundError('User');
        // }

        await SettingsRepository.update(userId, dto);

        return { message: 'Settings updated' };
    },
};