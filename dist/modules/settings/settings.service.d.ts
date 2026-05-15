import { SettingsCredentials } from './types/settings.types';
export declare const SettingsService: {
    getSettings(dto: {
        userId: number;
    }): Promise<{
        userId: number;
        id: number;
        signature: string | null;
        birthDate: Date | null;
        avatar: string | null;
        pseudonym: string;
        isImageSignature: boolean;
        isTextSignature: boolean;
    }>;
    updateSettings(userId: number, dto: SettingsCredentials): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=settings.service.d.ts.map