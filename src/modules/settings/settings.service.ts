import { error } from 'node:console';
import { NotFoundError } from '../../errors/app.errors';
import { SettingsRepository } from './settings.repository';
import { SettingsServiceContract } from './types/settings.contracts';


export const SettingsService: SettingsServiceContract = {

    async getSettings(dto) {
        const profile = await SettingsRepository.findByUserId(dto.userId);

        if (!profile) {
            throw new NotFoundError('Profile');
        }

        return profile;
    },

    async updateSettings(userId, dto) {
        //const user = await SettingsRepository.findByUserId(userId);

        // if (!user) {
        //      throw new NotFoundError('User');
        // }

        await SettingsRepository.update(userId, dto);

        return { message: 'Settings updated' };
    },
};