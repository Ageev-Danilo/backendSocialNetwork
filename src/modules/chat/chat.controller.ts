import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import { ValidationError } from '../../errors/app.errors';
import { ChatService } from './chat.service';
import type { ChatControllerContract } from './types/chat.contracts';


export const ChatController: ChatControllerContract = {
    async getChats(req, res, next) {
        try {
            const chats = await ChatService.getChats(res.locals.userId);
            res.status(200).json(chats);
        } catch (error) {
            next(error);
        }
    },

    async getChatMessages(req, res, next) {
        try {
            const chatId = Number(req.params.chatId);
            if (Number.isNaN(chatId)) throw new ValidationError('Chat ID must be a number');
            const messages = await ChatService.getChatMessages(res.locals.userId, chatId);
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    },

    async createChat(req, res, next) {
        try {
            const chat = await ChatService.createChat(res.locals.userId, req.body);
            res.status(201).json(chat);
        } catch (error) {
            next(error);
        }
    },

    async updateChat(req, res, next) {
        try {
            const chatId = Number(req.params.chatId);
            if (Number.isNaN(chatId)) throw new ValidationError('Chat ID must be a number');
            const chat = await ChatService.updateChat(res.locals.userId, chatId, req.body);
            res.status(200).json(chat);
        } catch (error) {
            next(error);
        }
    },

    async deleteChat(req, res, next) {
        try {
            const chatId = Number(req.params.chatId);
            if (Number.isNaN(chatId)) throw new ValidationError('Chat ID must be a number');
            const result = await ChatService.deleteChat(res.locals.userId, chatId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async createMessage(req, res, next) {
        try {
            const chatId = Number(req.params.chatId);
            if (Number.isNaN(chatId)) throw new ValidationError('Chat ID must be a number');
            const result = await ChatService.createMessage(res.locals.userId, chatId, req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
};