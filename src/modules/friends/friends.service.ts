import { FriendsRepository } from './friends.repository';
import { FriendsServiceContract } from './types/friends.contracts';
import { FriendRequestCredentials, SendFriendRequestDto } from './types/friends.types';

export const FriendsService: FriendsServiceContract = {
    async getFriendsById(profileId: number): Promise<any[]> {
        return await FriendsRepository.getFriendsById(profileId);
    },

    async sendFriendRequest(dto: SendFriendRequestDto): Promise<{ message: string }> {
        return await FriendsRepository.sendFriendRequest(dto);
    }
};