import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { SendFriendRequestDto, FriendRequestCredentials } from './friends.types';

export interface FriendsControllerContract {
    getFriendsById(
        req: Request<{ id: string }, any[], object, object, AuthenticatedUser>,
        res: Response<any[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    sendFriendRequest(
        req: Request<object, { message: string }, FriendRequestCredentials, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    getAllProfiles(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    acceptFriendRequest(
        req: Request<object, { message: string }, { senderId: number }, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    deleteFriend(
        req: Request<object, { message: string }, { friendId: number }, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;

    getFriendRequests(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;
}

export interface FriendsServiceContract {
    getFriendsById(profileId: number): Promise<any[]>;
    sendFriendRequest(dto: SendFriendRequestDto): Promise<{ message: string }>;
    getAllProfiles(): Promise<any[]>;
    acceptFriendRequest(receiverId: number, senderId: number): Promise<{ message: string }>;
    deleteFriend(ownerId: number, friendId: number): Promise<{ message: string }>;
    getFriendRequests(profileId: number): Promise<any[]>;
}

export interface FriendsRepositoryContract {
    getFriendsById(profileId: number): Promise<any[]>;
    sendFriendRequest(data: SendFriendRequestDto): Promise<{ message: string }>;
    getAllProfiles(): Promise<any[]>;
    acceptFriendRequest(receiverId: number, senderId: number): Promise<{ message: string }>;
    deleteFriend(ownerId: number, friendId: number): Promise<{ message: string }>;
    getFriendRequests(profileId: number): Promise<any[]>;
}