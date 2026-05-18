export interface SettingsCredentials {
    firstName:        string;
    lastName:         string;
    username:         string;
    pseudonym:        string;
    date:             string | null;
    signature:        string | null;
    profileImage:     string | null;
    isImageSignature: boolean;
    isTextSignature:  boolean;
}

export interface UpdateSettingsInput extends Omit<SettingsCredentials, 'isImageSignature' | 'isTextSignature'> {
    isImageSignature: boolean | string;
    isTextSignature: boolean | string;
}