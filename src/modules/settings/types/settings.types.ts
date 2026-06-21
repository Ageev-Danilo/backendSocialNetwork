export interface SettingsCredentials {
    firstName: string;
    lastName: string;
    pseudonym: string;
    date: string | null;
    signature: string | null;
    profileImage: string | null;
    isImageSignature: boolean;
    isTextSignature: boolean;
}

export interface UpdateSettingsInput extends Omit<SettingsCredentials, 'isImageSignature' | 'isTextSignature'> {
    isImageSignature: boolean | string;
    isTextSignature: boolean | string;
}

export interface UpdateEmailDto {
    email: string;
}

export interface UpdatePasswordDto {
    password: string;
}