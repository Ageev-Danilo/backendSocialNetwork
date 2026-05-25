export interface User {
    id:        number;
    email:     string;
    username:  string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWithPassword extends User {
    password: string;
}

export interface UserCreateInput {
    email:    string;
    password: string;
}

export interface LoginCredentials {
    email:    string;
    password: string;
}

export interface RegisterCredentials {
    email:    string;
    password: string;
}

export interface ProfileCredentials {
    pseudonym:    string;
    firstName:    string;
    lastName:     string;
    date?:         string;
    username:     string;
    signature:    string;
    profileImage?: string;
}