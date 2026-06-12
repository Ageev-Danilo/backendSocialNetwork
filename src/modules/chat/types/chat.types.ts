export interface ChatCreateBody {
    name?: string | null;
    isGroup?: boolean;
    avatar?: string | null;
    memberIds: number[];
}

export interface ChatUpdateBody {
    name?: string | null;
    avatar?: string | null;
    memberIds?: number[];
}

export interface MessageCreateBody {
    text: string;
}

export interface ChatUser {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    username?: string | null;
    profileImage: string | null;
}

export interface ChatDto {
    id: number;
    name?: string | null;
    isGroup: boolean;
    avatar?: string | null;
    adminId?: number | null;
    users: ChatUser[];
}

export interface MessageDto {
    id: number;
    text: string;
    createdAt: Date;
    sender: ChatUser;
}