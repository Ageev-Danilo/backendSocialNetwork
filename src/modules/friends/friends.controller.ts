import type { Request, Response, NextFunction } from 'express';
import { FriendsService } from './friends.service';
import { FriendsControllerContract } from "./types/friends.contracts";

export const FriendsController: FriendsControllerContract = {
    async getFriendsById(req, res, next) {
        try {
            const profileId = Number(req.params.id);
            const friends = await FriendsService.getFriendsById(profileId);
            res.status(200).json(friends);
        } catch (error) {
            next(error);
        }
    },

    async sendFriendRequest(req, res, next) {
        try {
            const result = await FriendsService.sendFriendRequest(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
};