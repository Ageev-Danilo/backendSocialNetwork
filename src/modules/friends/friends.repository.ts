import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../prisma/client";
import { FriendsRepositoryContract } from "./types/friends.contracts";
import { SendFriendRequestDto } from "./types/friends.types";
import { InternalServerError, ValidationError } from "../../errors/app.errors";

export const FriendsRepository: FriendsRepositoryContract = {
    async getFriendsById(profileId: number) {
        try {
            const contacts = await PrismaClient.contact.findMany({
                where: {
                    contactOwnerId: profileId
                },
                include: {
                    contactUser: true
                }
            });

            return contacts.map(contact => {
                return contact.contactUser;
            });
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                if (['P2000', 'P2005', 'P2006', 'P2007', 'P2009'].includes(error.code)) {
                    throw new ValidationError("WRONG_QUERY");
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async sendFriendRequest(data: SendFriendRequestDto) {
        try {
            await PrismaClient.friendRequest.create({
                data: {
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    status: "PENDING"
                }
            });

            return { message: "FRIEND_REQUEST_SENT" };
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ValidationError('TOO_MUCH_VALUES');
                }
                if (['P2000', 'P2005', 'P2006', 'P2007'].includes(error.code)) {
                    throw new ValidationError('WRONG_QUERY');
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async getAllProfiles() {
        try {
            return await PrismaClient.profile.findMany();
        } catch (error) {
            console.log(error);
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async acceptFriendRequest(receiverId: number, senderId: number) {
        try {
            await PrismaClient.$transaction([
                PrismaClient.friendRequest.deleteMany({
                    where: {
                        senderId: senderId,
                        receiverId: receiverId
                    }
                }),
                PrismaClient.contact.create({
                    data: {
                        contactOwnerId: receiverId,
                        contactUserId: senderId
                    }
                })
            ]);

            return { message: "FRIEND_REQUEST_ACCEPTED" };
        } catch (error) {
            console.log(error);
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async deleteFriend(ownerId: number, friendId: number) {
        try {
            await PrismaClient.contact.deleteMany({
                where: {
                    contactOwnerId: ownerId,
                    contactUserId: friendId
                }
            });

            return { message: "FRIEND_DELETED" };
        } catch (error) {
            console.log(error);
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async getFriendRequests(profileId: number) {
        try {
            const requests = await PrismaClient.friendRequest.findMany({
                where: {
                    receiverId: profileId
                },
                include: {
                    sender: true
                }
            });

            return requests.map(request => {
                return request.sender;
            });
        } catch (error) {
            console.log(error);
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    }
};