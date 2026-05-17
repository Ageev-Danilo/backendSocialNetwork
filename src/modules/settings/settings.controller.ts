import { SettingsService } from './settings.service';
import { SettingsControllerContract } from './types/settings.contracts';

export const SettingsController: SettingsControllerContract = {
    async getSettings(req, res, next) {
        try {
            const data = await SettingsService.getSettings({ userId: res.locals.userId });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async updateSettings(req, res, next) {
        try {
            const profileImage = req.file?.filename ?? req.body.profileImage ?? null;

            const result = await SettingsService.updateSettings(res.locals.userId, {
                ...req.body,
                profileImage,
            });
            console.log(res.locals.userId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};