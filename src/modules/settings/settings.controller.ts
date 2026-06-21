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
            const isImageSignature = (req.body.isImageSignature as unknown) === 'true' || req.body.isImageSignature === true;
            const isTextSignature = (req.body.isTextSignature as unknown) === 'true' || req.body.isTextSignature === true;

            const result = await SettingsService.updateSettings(res.locals.userId, {
                ...req.body,
                profileImage,
                isImageSignature,
                isTextSignature,
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async updateEmail(req, res, next) {
        try {
            const result = await SettingsService.updateEmail(res.locals.userId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async updatePassword(req, res, next) {
        try {
            const result = await SettingsService.updatePassword(res.locals.userId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};