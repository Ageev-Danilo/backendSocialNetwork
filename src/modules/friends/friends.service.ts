import { FriendsRepository } from './friends.repository';
import { FriendsServiceContract } from './types/friends.contracts';
import { SendFriendRequestDto } from './types/friends.types';

export const FriendsService: FriendsServiceContract = {
    async getFriendsById(profileId: number): Promise<any[]> {
        return await FriendsRepository.getFriendsById(profileId);
    },

    async sendFriendRequest(dto: SendFriendRequestDto): Promise<{ message: string }> {
        return await FriendsRepository.sendFriendRequest(dto);
    },

    async getAllProfiles(): Promise<any[]> {
        return await FriendsRepository.getAllProfiles();
    },

    async acceptFriendRequest(receiverId: number, senderId: number): Promise<{ message: string }> {
        return await FriendsRepository.acceptFriendRequest(receiverId, senderId);
    },

    async deleteFriend(ownerId: number, friendId: number): Promise<{ message: string }> {
        return await FriendsRepository.deleteFriend(ownerId, friendId);
    },

    async getFriendRequests(profileId: number): Promise<any[]> {
        return await FriendsRepository.getFriendRequests(profileId);
    }
};