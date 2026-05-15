export interface FriendRequestCredentials {
    receiverId: number;
}

export interface SendFriendRequestDto {
    senderId: number;
    receiverId: number;
}

export interface FriendRequest {
    id:         number;
    senderId:   number
    receiverId: number;
    status:     string;
}