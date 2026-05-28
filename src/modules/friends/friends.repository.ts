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
    PublicProfileData,
} from './types/friends.types';
 
const PROFILE_SELECT = {
    id:               true,
    userId:           true,
    pseudonym:        true,
    signature:        true,
    date:             true,
    profileImage:     true,
    isImageSignature: true,
    isTextSignature:  true,
    user:             { select: { username: true } },
};

function mapProfile(p: any): ProfilePublic {
    return {
        id:               p.id,
        userId:           p.userId,
        pseudonym:        p.pseudonym,
        username:         p.user?.username ?? null,
        signature:        p.signature,
        date:             p.date,
        profileImage:     p.profileImage,
        isImageSignature: p.isImageSignature,
        isTextSignature:  p.isTextSignature,
    };
}
 
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
            if (!profileId) {
                const profiles = await PrismaClient.profile.findMany({
                    select:  PROFILE_SELECT,
                    orderBy: { id: 'asc' },
                });
                return profiles.map(mapProfile);
            }
 
            const existingContacts = await PrismaClient.contact.findMany({
                where: {
                    OR: [
                        { ownerProfileId:   profileId },
                        { contactProfileId: profileId },
                    ],
                },
                select: { ownerProfileId: true, contactProfileId: true },
            });
 
            const friendIds = new Set<number>();
            for (const c of existingContacts) {
                friendIds.add(c.ownerProfileId);
                friendIds.add(c.contactProfileId);
            }
 
            const pendingRequests = await PrismaClient.friendRequest.findMany({
                where: {
                    OR: [
                        { senderId:   profileId },
                        { receiverId: profileId },
                    ],
                },
                select: { senderId: true, receiverId: true },
            });
 
            const pendingIds = new Set<number>();
            for (const r of pendingRequests) {
                pendingIds.add(r.senderId);
                pendingIds.add(r.receiverId);
            }
 
            const excludeIds = new Set([profileId, ...friendIds, ...pendingIds]);
 
            const profiles = await PrismaClient.profile.findMany({
                where:   { id: { notIn: [...excludeIds] } },
                select:  PROFILE_SELECT,
                orderBy: { id: 'asc' },
            });
            return profiles.map(mapProfile);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
 
    async getFriends(ownerProfileId: number): Promise<ContactWithProfile[]> {
        try {
            const contacts = await PrismaClient.contact.findMany({
                where:   { ownerProfileId },
                include: { contactProfile: { select: PROFILE_SELECT } },
                orderBy: { id: 'desc' },
            });
            return contacts.map(c => ({
                ...c,
                contactProfile: mapProfile(c.contactProfile),
            })) as unknown as ContactWithProfile[];
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
 
    async createFriendRequest(senderProfileId: number, receiverProfileId: number) {
        try {
            if (senderProfileId === receiverProfileId) throw new ValidationError('CANNOT_REQUEST_SELF');
 
            const receiver = await PrismaClient.profile.findUnique({ where: { id: receiverProfileId } });
            if (!receiver) throw new NotFoundError('Profile');
 
            const existingContact = await PrismaClient.contact.findUnique({
                where: {
                    ownerProfileId_contactProfileId: {
                        ownerProfileId:   senderProfileId,
                        contactProfileId: receiverProfileId,
                    },
                },
            });
            if (existingContact) throw new ConflictError('Contact');
 
            const existingRequest = await PrismaClient.friendRequest.findFirst({
                where: {
                    OR: [
                        { senderId: senderProfileId, receiverId: receiverProfileId },
                        { senderId: receiverProfileId, receiverId: senderProfileId },
                    ],
                },
            });
            if (existingRequest) throw new ConflictError('FriendRequest');
 
            await PrismaClient.friendRequest.create({
                data: { senderId: senderProfileId, receiverId: receiverProfileId },
            });
            return { message: 'FRIEND_REQUEST_SENT' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') throw new ConflictError('FriendRequest');
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
            if (!request) throw new NotFoundError('FriendRequest');
 
            await PrismaClient.$transaction([
                PrismaClient.contact.create({
                    data: { ownerProfileId, contactProfileId: senderProfileId },
                }),
                PrismaClient.contact.create({
                    data: { ownerProfileId: senderProfileId, contactProfileId: ownerProfileId },
                }),
                PrismaClient.friendRequest.delete({ where: { id: request.id } }),
            ]);
            return { message: 'FRIEND_ADDED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') throw new ConflictError('Contact');
                throw new ValidationError('WRONG_QUERY');
            }
            throw error;
        }
    },
 
    async rejectFriendRequest(receiverProfileId: number, senderProfileId: number) {
        try {
            const request = await PrismaClient.friendRequest.findUnique({
                where: {
                    senderId_receiverId: {
                        senderId:   senderProfileId,
                        receiverId: receiverProfileId,
                    },
                },
            });
            if (!request) throw new NotFoundError('FriendRequest');
 
            await PrismaClient.friendRequest.delete({ where: { id: request.id } });
            return { message: 'FRIEND_REQUEST_REJECTED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw error;
        }
    },
 
    async deleteFriend(ownerProfileId: number, contactProfileId: number) {
        try {
            const contact = await PrismaClient.contact.findUnique({
                where: {
                    ownerProfileId_contactProfileId: { ownerProfileId, contactProfileId },
                },
            });
            if (!contact) throw new NotFoundError('Contact');
 
            await PrismaClient.$transaction([
                PrismaClient.contact.delete({ where: { id: contact.id } }),
                PrismaClient.contact.deleteMany({
                    where: {
                        ownerProfileId:   contactProfileId,
                        contactProfileId: ownerProfileId,
                    },
                }),
            ]);
            return { message: 'FRIEND_REMOVED' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw error;
        }
    },
 
    async getFriendRequests(receiverProfileId: number): Promise<FriendRequestWithSender[]> {
        try {
            const requests = await PrismaClient.friendRequest.findMany({
                where:   { receiverId: receiverProfileId },
                include: { sender: { select: PROFILE_SELECT } },
                orderBy: { createdAt: 'desc' },
            });
            return requests.map(r => ({
                ...r,
                sender: mapProfile(r.sender),
            })) as unknown as FriendRequestWithSender[];
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
 
    async getPublicProfile(profileId: number): Promise<PublicProfileData> {
        try {
            const profile = await PrismaClient.profile.findUnique({
                where:  { id: profileId },
                select: {
                    ...PROFILE_SELECT,
                    userId: true,
                    albums: {
                        orderBy: { id: 'desc' },
                        take:    3,
                        include: { images: true },
                    },
                },
            });
            if (!profile) throw new NotFoundError('Profile');
 
            const lastPost = await PrismaClient.post.findFirst({
                where:   { userId: (profile as any).userId },
                orderBy: { id: 'desc' },
                include: { tags: true, views: true, media: true },
            });
 
            return {
                profile:  mapProfile(profile),
                albums:   (profile as any).albums ?? [],
                lastPost: lastPost
                    ? {
                          id:        lastPost.id,
                          title:     lastPost.title,
                          content:   lastPost.content,
                          createdAt: lastPost.createdAt,
                          tags:      lastPost.tags,
                          media:     lastPost.media,
                          likes:     0,
                          views:     Array.isArray(lastPost.views) ? lastPost.views.length : 0,
                      }
                    : null,
            };
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};