export interface User {
    id: number;
    email: string;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserWithPassword extends User {
    password: string;
}
export interface UserCreateInput {
    email: string;
    password: string;
    username?: string | null;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterCredentials {
    email: string;
    password: string;
    username?: string | null;
}
export interface ProfileCredentials {
    pseudonym: string;
    signature?: string | null;
    birthDate?: Date | null;
    avatar?: string | null;
    isImageSignature?: boolean;
    isTextSignature?: boolean;
}
//# sourceMappingURL=user.types.d.ts.map