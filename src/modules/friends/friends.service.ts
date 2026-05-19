import { PrismaClient } from '../../prisma/client';
import { FriendsRepository } from './friends.repository';
import type { FriendsServiceContract } from './types/friends.contracts';

async function requireProfileId(userId: number): Promise<number> {
    let profileId = await FriendsRepository.getProfileIdByUserId(userId);

    if (!profileId) {
        const profile = await PrismaClient.profile.create({
            data: {
                userId,
                pseudonym:        '',
                signature:        '',
                isImageSignature: false,
                isTextSignature:  true,
            },
            select: { id: true },
        });
        profileId = profile.id;
    }

    return profileId;
}

export const FriendsService: FriendsServiceContract = {
    async getRecommendations(userId) {
        return FriendsRepository.getRecommendations(userId);
    },

    async getFriends(userId) {
        const profileId = await requireProfileId(userId);
        return FriendsRepository.getFriends(profileId);
    },

    async createFriendRequest(userId, receiverProfileId) {
        const senderProfileId = await requireProfileId(userId);
        return FriendsRepository.createFriendRequest(senderProfileId, receiverProfileId);
    },

    async acceptFriend(userId, senderProfileId) {
        const ownerProfileId = await requireProfileId(userId);
        return FriendsRepository.acceptFriend(ownerProfileId, senderProfileId);
    },

    async deleteFriend(userId, contactProfileId) {
        const ownerProfileId = await requireProfileId(userId);
        return FriendsRepository.deleteFriend(ownerProfileId, contactProfileId);
    },

    async rejectFriendRequest(userId, senderProfileId) {
        const receiverProfileId = await requireProfileId(userId);
        return FriendsRepository.rejectFriendRequest(receiverProfileId, senderProfileId);
    },

    async getFriendRequests(userId) {
        const receiverProfileId = await requireProfileId(userId);
        return FriendsRepository.getFriendRequests(receiverProfileId);
    },

    async getPublicProfile(profileId) {
        return FriendsRepository.getPublicProfile(profileId);
    },
};