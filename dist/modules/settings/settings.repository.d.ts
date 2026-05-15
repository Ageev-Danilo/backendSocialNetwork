import { SettingsCredentials } from './types/settings.types';
export declare const SettingsRepository: {
    findByUserId(userId: number): Promise<{
        userId: number;
        id: number;
        signature: string | null;
        birthDate: Date | null;
        avatar: string | null;
        pseudonym: string;
        isImageSignature: boolean;
        isTextSignature: boolean;
    } | null>;
    update(userId: number, data: SettingsCredentials): Promise<{
        userId: number;
        id: number;
        signature: string | null;
        birthDate: Date | null;
        avatar: string | null;
        pseudonym: string;
        isImageSignature: boolean;
        isTextSignature: boolean;
    }>;
};
//# sourceMappingURL=settings.repository.d.ts.map