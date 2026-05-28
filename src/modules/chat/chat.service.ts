import { ValidationError } from '../../errors/app.errors';
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

    async createMessage(userId, chatId, dto) {
        return ChatRepository.createMessage(chatId, userId, dto).then(() => ({ message: 'Message created' }));
    },
};
