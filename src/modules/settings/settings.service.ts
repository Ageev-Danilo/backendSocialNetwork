import { SettingsRepository } from './settings.repository';
import { SettingsServiceContract } from './types/settings.contracts';
import { ConflictError, NotFoundError } from '../../errors/app.errors';


export const SettingsService: SettingsServiceContract = {
    async getSettings(dto) {
        const profile = await SettingsRepository.findByUserId(dto.userId);
        return profile ?? null;
    },

    async updateSettings(userId, dto) {
        await SettingsRepository.update(userId, dto);
        return { message: 'Settings updated' };
    },

    async updateEmail(userId, dto) {
        const user = await SettingsRepository.findByUserId(userId);
        if (!user) throw new NotFoundError('User');
        if (user.email === dto.email) throw new ConflictError('Email');

        await SettingsRepository.updateEmail(userId, dto.email);
        return { message: 'Email updated' };
    },

    async updatePassword(userId, dto) {
        const user = await SettingsRepository.findByUserId(userId);
        if (!user) throw new NotFoundError('User');

        await SettingsRepository.updatePassword(userId, dto.password);
        return { message: 'Password updated' };
    },
};