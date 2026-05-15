import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../prisma/client";
import { FriendsRepositoryContract } from "./types/friends.contracts";
import { FriendRequestCredentials, SendFriendRequestDto } from "./types/friends.types";
import { InternalServerError, ValidationError } from "../../errors/app.errors";

export const FriendsRepository: FriendsRepositoryContract = {
    async getFriendsById(profileId: number) {
        try {
            const requests = await PrismaClient.friendRequest.findMany({
                where: {
                    OR: [
                        { senderId: profileId, status: "ACCEPTED" },
                        { receiverId: profileId, status: "ACCEPTED" }
                    ]
                },
                include: {
                    sender: true,
                    receiver: true
                }
            });

            return requests.map(req => {
                return req.senderId === profileId ? req.receiver : req.sender;
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
            console.log('[DEBUG] Sending friend request:', JSON.stringify(data, null, 2));

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
};