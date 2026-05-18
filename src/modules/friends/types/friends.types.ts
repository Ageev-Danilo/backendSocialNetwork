export interface ProfilePublic {
    id:               number;
    pseudonym:        string;
    signature:        string | null;
    date?:        string | null;
    profileImage:           string | null;
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

export interface CreateFriendRequestBody {
    receiverProfileId: number;
}

export interface AcceptFriendBody {
    senderProfileId: number;
}

export interface DeleteFriendBody {
    contactProfileId: number;
}
