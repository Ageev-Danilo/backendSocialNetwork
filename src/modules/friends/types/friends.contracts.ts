import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { FriendRequestCredentials, FriendRequest, SendFriendRequestDto} from './friends.types';

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
}

export interface FriendsServiceContract {
    getFriendsById(profileId: number): Promise<any[]>;
    sendFriendRequest(dto: SendFriendRequestDto): Promise<{ message: string }>;
}

export interface FriendsRepositoryContract {
    getFriendsById(profileId: number): Promise<any[]>;
    sendFriendRequest(data: SendFriendRequestDto): Promise<{ message: string }>;
}