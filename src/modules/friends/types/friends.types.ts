export interface FriendRequestCredentials {
    senderId:   number;
    receiverId: number;
}

export interface FriendRequest {
    id:         number;
    senderId:   number
    receiverId: number;
    status:     string;
}