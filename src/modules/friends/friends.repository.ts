import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaClient } from '../../prisma/client';
import {
    ConflictError,
    InternalServerError,
    NotFoundError,
    ValidationError,
} from '../../errors/app.errors';
import type { FriendsRepositoryContract } from './types/friends.contracts';
import type {
    ContactWithProfile,
    FriendRequestWithSender,
    ProfilePublic,
} from './types/friends.types';

const PROFILE_SELECT = {
    id:               true,
    pseudonym:        true,
    signature:        true,
    date:             true,
    profileImage:     true,
    isImageSignature: true,
    isTextSignature:  true,
} as const;

export const FriendsRepository: FriendsRepositoryContract = {
    async getProfileIdByUserId(userId: number) {
        const profile = await PrismaClient.profile.findUnique({
            where:  { userId },
            select: { id: true },
        });
        return profile?.id ?? null;
    },

    async getRecommendations(userId: number): Promise<ProfilePublic[]> {
        try {
            const profileId = await this.getProfileIdByUserId(userId);
            const where = profileId ? { id: { not: profileId } } : {};
            return await PrismaClient.profile.findMany({
                where,
                select:  PROFILE_SELECT,
                orderBy: { id: 'asc' },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async getFriends(ownerProfileId: number): Promise<ContactWithProfile[]> {
        try {
            return await PrismaClient.contact.findMany({
                where:   { ownerProfileId },
                include: { contactProfile: { select: PROFILE_SELECT } },
                orderBy: { id: 'desc' },
            }) as unknown as ContactWithProfile[];
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async createFriendRequest(senderProfileId: number, receiverProfileId: number) {
        try {
            if (senderProfileId === receiverProfileId) {
                throw new ValidationError('CANNOT_REQUEST_SELF');
            }

            const receiver = await PrismaClient.profile.findUnique({
                where: { id: receiverProfileId },
            });
            if (!receiver) {
                throw new NotFoundError('Profile');
            }

            const existingContact = await PrismaClient.contact.findUnique({
                where: {
                    ownerProfileId_contactProfileId: {
                        ownerProfileId:   senderProfileId,
                        contactProfileId: receiverProfileId,
                    },
                },
            });
            if (existingContact) {
                throw new ConflictError('Contact');
            }

            await PrismaClient.friendRequest.create({
                data: {
                    senderId:   senderProfileId,
                    receiverId: receiverProfileId,
                },
            });

            return { message: 'FRIEND_REQUEST_SENT' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError('FriendRequest');
                }
                throw new ValidationError('WRONG_QUERY');
            }
            throw error;
        }
    },

    async acceptFriend(ownerProfileId: number, senderProfileId: number) {
        try {
            const request = await PrismaClient.friendRequest.findUnique({
                where: {
                    senderId_receiverId: {
                        senderId:   senderProfileId,
                        receiverId: ownerProfileId,
                    },
                },
            });
            if (!request) {
                throw new NotFoundError('FriendRequest');
            }

            await PrismaClient.$transaction([
                PrismaClient.contact.create({
                    data: {
                        ownerProfileId,
                        contactProfileId: senderProfileId,
                    },
                }),
                PrismaClient.friendRequest.delete({
                    where: { id: request.id },
                }),
            ]);

            return { message: 'FRIEND_ADDED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError('Contact');
                }
                throw new ValidationError('WRONG_QUERY');
            }
            throw error;
        }
    },

    async deleteFriend(ownerProfileId: number, contactProfileId: number) {
        try {
            const contact = await PrismaClient.contact.findUnique({
                where: {
                    ownerProfileId_contactProfileId: {
                        ownerProfileId,
                        contactProfileId,
                    },
                },
            });
            if (!contact) {
                throw new NotFoundError('Contact');
            }

            await PrismaClient.contact.delete({ where: { id: contact.id } });
            return { message: 'FRIEND_REMOVED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw error;
        }
    },

    async getFriendRequests(receiverProfileId: number): Promise<FriendRequestWithSender[]> {
        try {
            return await PrismaClient.friendRequest.findMany({
                where:   { receiverId: receiverProfileId },
                include: { sender: { select: PROFILE_SELECT } },
                orderBy: { createdAt: 'desc' },
            }) as unknown as FriendRequestWithSender[];
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};