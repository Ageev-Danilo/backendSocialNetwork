import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import { FriendsService } from './friends.service';
import type { FriendsControllerContract } from './types/friends.contracts';
import type {
    AcceptFriendBody,
    CreateFriendRequestBody,
    DeleteFriendBody,
    RejectFriendRequestBody,
} from './types/friends.types';

export const FriendsController: FriendsControllerContract = {

    async getRecommendations(req, res, next) {
        try {
            const profiles = await FriendsService.getRecommendations(res.locals.userId);
            res.status(200).json(profiles);
        } catch (error) {
            next(error);
        }
    },

    async getFriends(req, res, next) {
        try {
            const contacts = await FriendsService.getFriends(res.locals.userId);
            res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    async createFriendRequest(
        req: Request<object, { message: string }, CreateFriendRequestBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const result = await FriendsService.createFriendRequest(
                res.locals.userId,
                req.body.receiverProfileId,
            );
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async acceptFriend(
        req: Request<object, { message: string }, AcceptFriendBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const result = await FriendsService.acceptFriend(
                res.locals.userId,
                req.body.senderProfileId,
            );
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async deleteFriend(
        req: Request<object, { message: string }, DeleteFriendBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const result = await FriendsService.deleteFriend(
                res.locals.userId,
                req.body.contactProfileId,
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async rejectFriendRequest(
        req: Request<object, { message: string }, RejectFriendRequestBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ) {
        try {
            const result = await FriendsService.rejectFriendRequest(
                res.locals.userId,
                req.body.senderProfileId,
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async getFriendRequests(req, res, next) {
        try {
            const requests = await FriendsService.getFriendRequests(res.locals.userId);
            res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    },

    async getPublicProfile(req, res, next) {
        try {
            const profileId = Number(req.params.profileId);
            const data = await FriendsService.getPublicProfile(profileId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
};