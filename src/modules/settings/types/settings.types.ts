export interface SettingsCredentials {
    pseudonym: string;
    date: string | null;
    signature: string | null;
    profileImage: string | null;
    isImageSignature: boolean;
    isTextSignature: boolean;
}