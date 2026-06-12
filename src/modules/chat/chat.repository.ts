import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaClient } from '../../prisma/client';
import { InternalServerError, NotFoundError, ValidationError } from '../../errors/app.errors';
import type { ChatCreateBody, ChatUpdateBody, ChatDto, MessageDto, MessageCreateBody } from './types/chat.types';
import type { ChatRepositoryContract } from './types/chat.contracts';

function buildChatSelect() {
    return {
        id: true,
        name: true,
        isGroup: true,
        avatar: true,
        adminId: true,
        users: {
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profile: {
                    select: {
                        profileImage: true,
                        pseudonym: true,
                    },
                },
            },
        },
    } as const;
}

function mapChatUsers(users: any[]) {
    return users.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName ?? null,
        lastName: u.lastName ?? null,
        username: u.profile?.pseudonym ?? null,
        profileImage: u.profile?.profileImage ?? null,
    }));
}

function mapChat(raw: any): ChatDto {
    return {
        id: raw.id,
        name: raw.name ?? null,
        isGroup: raw.isGroup,
        avatar: raw.avatar ?? null,
        adminId: raw.adminId ?? null,
        users: mapChatUsers(raw.users),
    };
}

export const ChatRepository: ChatRepositoryContract = { 
    async getChatById(chatId) {
        try {
            return await PrismaClient.chat.findUnique({
                where: { id: chatId },
                select: { id: true, adminId: true, isGroup: true },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async createChat(adminId, dto) {
        try {
            const memberIds = Array.from(new Set([adminId, ...dto.memberIds]));
            const createData: any = {
                isGroup: dto.isGroup ?? false,
                adminId,
                users: { connect: memberIds.map((id) => ({ id })) },
            };
            if (dto.name !== undefined) createData.name = dto.name;
            if (dto.avatar !== undefined) createData.avatar = dto.avatar;
            const raw = await PrismaClient.chat.create({
                data: createData,
                select: buildChatSelect(),
            });
            return mapChat(raw);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2003') throw new ValidationError('One or more users were not found');
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async updateChat(chatId, dto) {
        try {
            const chat = await PrismaClient.chat.findUnique({
                where: { id: chatId },
                select: { id: true, isGroup: true, adminId: true },
            });
            if (!chat) throw new NotFoundError('Chat');
            const updateData: any = {};
            if (dto.name !== undefined) updateData.name = dto.name;
            if (dto.avatar !== undefined) updateData.avatar = dto.avatar;
            if (dto.memberIds !== undefined) updateData.users = { set: dto.memberIds.map((id) => ({ id })) };
            const createData: any = {
                id: chatId,
                isGroup: chat.isGroup,
                adminId: chat.adminId,
                name: dto.name ?? null,
                avatar: dto.avatar ?? null,
            };
            if (dto.memberIds !== undefined) createData.users = { connect: dto.memberIds.map((id) => ({ id })) };
            const raw = await PrismaClient.chat.upsert({
                where: { id: chatId },
                update: updateData,
                create: createData,
                select: buildChatSelect(),
            });
            return mapChat(raw);
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') throw new NotFoundError('Chat');
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async deleteChat(chatId) {
        try {
            const chat = await PrismaClient.chat.findUnique({
                where: { id: chatId },
                select: { id: true },
            });
            if (!chat) throw new NotFoundError('Chat');
            await PrismaClient.chat.delete({ where: { id: chatId } });
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') throw new NotFoundError('Chat');
                throw new ValidationError('WRONG_QUERY');
            }
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },

    async createMessage(chatId, senderId, dto) {
        try {
            const chat = await PrismaClient.chat.findFirst({
                where: { id: chatId, users: { some: { id: senderId } } },
                select: { id: true },
            });
            if (!chat) throw new NotFoundError('Chat');
            await PrismaClient.message.create({
                data: { text: dto.text, chatId, senderId },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw error;
        }
    },

    async getMessagesByChatId(userId, chatId) {
        try {
            const chat = await PrismaClient.chat.findFirst({
                where: { id: chatId, users: { some: { id: userId } } },
                select: { id: true },
            });
            if (!chat) throw new NotFoundError('Chat');
            const messages = await PrismaClient.message.findMany({
                where: { chatId },
                include: {
                    sender: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            profile: { select: { profileImage: true } },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
            });
            return messages.map(m => ({
                id: m.id,
                text: m.text ?? '',
                createdAt: m.createdAt,
                sender: {
                    id: m.sender.id,
                    email: m.sender.email,
                    firstName: (m.sender as any).firstName ?? null,
                    lastName: (m.sender as any).lastName ?? null,
                    profileImage: (m.sender as any).profile?.profileImage ?? null,
                },
            }));
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw error;
        }
    },

    async getChatsByUserId(userId) {
        try {
            const raws = await PrismaClient.chat.findMany({
                where: { users: { some: { id: userId } } },
                select: buildChatSelect(),
                orderBy: { id: 'desc' },
            });
            return raws.map(mapChat);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) throw new ValidationError('WRONG_QUERY');
            throw new InternalServerError('UNHANDLED_DB_EXCEPTION');
        }
    },
};