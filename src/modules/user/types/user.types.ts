export interface User {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWithPassword extends User {
    password: string;
}

export interface UserCreateInput {
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
}

export interface ProfileCredentials {
    pseudonym: string;
    date?: string;
    username: string;
    signature: string;
    profileImage?: string;
}

export interface IUserClientEvents {
    'user:online': (userId: string, ack?: (response: { success: boolean }) => void) => void;

    'user:offline': (userId: string, ack?: (response: { success: boolean }) => void) => void;
}