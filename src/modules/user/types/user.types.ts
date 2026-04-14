export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    username: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWithPassword extends User {
    password: string;
}

export interface UserCreateInput {
    email: string;
    password: string;
    name: string;
    surname: string;
    username: string;
    avatar?: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
    surname: string;
    username: string;
}