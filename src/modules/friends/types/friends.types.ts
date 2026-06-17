export interface ProfilePublic {
    id:               number;
    userId:           number;
    pseudonym:        string;
    username:         string | null;
    signature:        string | null;
    date?:            string | null;
    profileImage:     string | null;
    isImageSignature: boolean;
    isTextSignature:  boolean;
}

export interface ContactWithProfile {
    id:               number;
    ownerProfileId:   number;
    contactProfileId: number;
    contactProfile:   ProfilePublic;
}

export interface FriendRequestWithSender {
    id:         number;
    createdAt:  Date;
    senderId:   number;
    receiverId: number;
    sender:     ProfilePublic;
}

export interface CreateFriendRequestBody  { receiverProfileId: number; }
export interface AcceptFriendBody         { senderProfileId:   number; }
export interface DeleteFriendBody         { contactProfileId:  number; }
export interface RejectFriendRequestBody  { senderProfileId:   number; }

export interface PublicAlbum {
    id:     number;
    name:   string;
    theme:  string;
    year:   number;
    images: { id: number; image: string }[];
}

export interface PublicPost {
    id:        number;
    title:     string;
    content:   string;
    createdAt: Date;
    tags:      { id: number; name: string }[];
    media:     { id: number; url: string }[];
    likes:     number;
    views:     number;
}

export interface PublicProfileData {
    profile:  ProfilePublic;
    albums:   PublicAlbum[];
    lastPost: PublicPost | null;
}