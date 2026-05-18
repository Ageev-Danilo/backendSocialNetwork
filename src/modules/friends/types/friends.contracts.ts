import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type {
    AcceptFriendBody,
    ContactWithProfile,
    CreateFriendRequestBody,
    DeleteFriendBody,
    FriendRequestWithSender,
    ProfilePublic,
} from './friends.types';

export interface FriendsControllerContract {
    getRecommendations(
        req: Request<object, ProfilePublic[], object, object, AuthenticatedUser>,
        res: Response<ProfilePublic[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    getFriends(
        req: Request<object, ContactWithProfile[], object, object, AuthenticatedUser>,
        res: Response<ContactWithProfile[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    createFriendRequest(
        req: Request<object, { message: string }, CreateFriendRequestBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    acceptFriend(
        req: Request<object, { message: string }, AcceptFriendBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    deleteFriend(
        req: Request<object, { message: string }, DeleteFriendBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    getFriendRequests(
        req: Request<object, FriendRequestWithSender[], object, object, AuthenticatedUser>,
        res: Response<FriendRequestWithSender[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
}

export interface FriendsServiceContract {
    getRecommendations(userId: number): Promise<ProfilePublic[]>;
    getFriends(userId: number): Promise<ContactWithProfile[]>;
    createFriendRequest(userId: number, receiverProfileId: number): Promise<{ message: string }>;
    acceptFriend(userId: number, senderProfileId: number): Promise<{ message: string }>;
    deleteFriend(userId: number, contactProfileId: number): Promise<{ message: string }>;
    getFriendRequests(userId: number): Promise<FriendRequestWithSender[]>;
}

export interface FriendsRepositoryContract {
    getRecommendations(userId: number): Promise<ProfilePublic[]>;
    getFriends(ownerProfileId: number): Promise<ContactWithProfile[]>;
    createFriendRequest(senderProfileId: number, receiverProfileId: number): Promise<{ message: string }>;
    acceptFriend(ownerProfileId: number, senderProfileId: number): Promise<{ message: string }>;
    deleteFriend(ownerProfileId: number, contactProfileId: number): Promise<{ message: string }>;
    getFriendRequests(receiverProfileId: number): Promise<FriendRequestWithSender[]>;
    getProfileIdByUserId(userId: number): Promise<number | null>;
}
