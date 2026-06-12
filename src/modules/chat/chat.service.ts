import { ForbiddenError, NotFoundError, ValidationError } from '../../errors/app.errors';
import { ChatRepository } from './chat.repository';
import type { ChatServiceContract } from './types/chat.contracts';

export const ChatService: ChatServiceContract = {
    async getChats(userId) {
        return ChatRepository.getChatsByUserId(userId);
    },

    async getChatMessages(userId, chatId) {
        return ChatRepository.getMessagesByChatId(userId, chatId);
    },

    async createChat(userId, dto) {
        if (!dto.memberIds || dto.memberIds.length === 0) {
            throw new ValidationError('Chat must contain at least one participant');
        }
        return ChatRepository.createChat(userId, dto);
    },

    async updateChat(userId, chatId, dto) { 
        const chat = await ChatRepository.getChatById(chatId);
        
        if (!chat) throw new NotFoundError('Chat');
        if (!chat.isGroup) throw new ValidationError('Only group chats can be updated');
        if (chat.adminId !== userId) throw new ForbiddenError('Only the group admin can update this chat');
        
        return ChatRepository.updateChat(chatId, dto);
    },

    async deleteChat(userId, chatId) { 
        const chat = await ChatRepository.getChatById(chatId);
        
        if (!chat) throw new NotFoundError('Chat');
        if (!chat.isGroup) throw new ValidationError('Only group chats can be deleted');
        if (chat.adminId !== userId) throw new ForbiddenError('Only the group admin can delete this chat');
        
        await ChatRepository.deleteChat(chatId);
        return { message: 'Chat deleted' };
    },

    async createMessage(userId, chatId, dto) {
        return ChatRepository.createMessage(chatId, userId, dto).then(() => ({ message: 'Message created' }));
    },
};