import { FriendsService } from './friends.service';
import { FriendsControllerContract } from "./types/friends.contracts";

export const FriendsController: FriendsControllerContract = {
    async getFriendsById(req, res, next) {
        try {
            const profileId = res.locals.userId;
            const friends = await FriendsService.getFriendsById(Number(profileId));
            res.status(200).json(friends);
        } catch (error) {
            next(error);
        }
    },

    async sendFriendRequest(req, res, next) {
        try {
            const senderId = res.locals.userId;
            
            if (!senderId) {
                res.status(401).json({ message: "UNAUTHORIZED_NO_USER_ID" });
                return;
            }

            const result = await FriendsService.sendFriendRequest({
                senderId: Number(senderId),
                receiverId: Number(req.body.receiverId)
            });

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async getAllProfiles(req, res, next) {
        try {
            const profiles = await FriendsService.getAllProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            next(error);
        }
    },

    async acceptFriendRequest(req, res, next) {
        try {
            const receiverId = res.locals.userId;
            const senderId = req.body.senderId;
            const result = await FriendsService.acceptFriendRequest(Number(receiverId), Number(senderId));
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async deleteFriend(req, res, next) {
        try {
            const ownerId = res.locals.userId;
            const friendId = req.body.friendId;
            const result = await FriendsService.deleteFriend(Number(ownerId), Number(friendId));
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async getFriendRequests(req, res, next) {
        try {
            const profileId = res.locals.userId;
            const requests = await FriendsService.getFriendRequests(Number(profileId));
            res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }
};