import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { ChatController } from './chat.controller';
import { createChatSchema, updateChatSchema, createMessageSchema } from './chat.schema';


export const chatRouter = Router();

chatRouter.get('/', authenticateMiddleware, ChatController.getChats);
chatRouter.get('/:chatId/messages', authenticateMiddleware, ChatController.getChatMessages);
chatRouter.post('/', authenticateMiddleware, validateMiddleware(createChatSchema), ChatController.createChat);
chatRouter.put('/:chatId', authenticateMiddleware, validateMiddleware(updateChatSchema), ChatController.updateChat);
chatRouter.delete('/:chatId', authenticateMiddleware, ChatController.deleteChat);
chatRouter.post('/:chatId/messages', authenticateMiddleware, validateMiddleware(createMessageSchema), ChatController.createMessage);