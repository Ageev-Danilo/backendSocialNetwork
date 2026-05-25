import { SettingsRepository } from './settings.repository';
import { SettingsServiceContract } from './types/settings.contracts';


export const SettingsService: SettingsServiceContract = {

    async getSettings(dto) {
        const profile = await SettingsRepository.findByUserId(dto.userId);
        return profile ?? null;
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