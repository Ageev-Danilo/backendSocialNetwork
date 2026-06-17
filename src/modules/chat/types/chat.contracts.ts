import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../types/token.types';
import type { ChatCreateBody, ChatUpdateBody, ChatDto, MessageCreateBody, MessageDto } from './chat.types';

export interface ChatControllerContract {
    getChats(req: Request, res: Response<ChatDto[]>, next: NextFunction): Promise<void>;
    getChatMessages(
        req: Request<{ chatId: string }, MessageDto[], object, object, AuthenticatedUser>,
        res: Response<MessageDto[], AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
    createChat(
        req: Request<object, ChatDto, ChatCreateBody, object, AuthenticatedUser>,
        res: Response<ChatDto, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
    updateChat(
        req: Request<{ chatId: string }, ChatDto, ChatUpdateBody, object, AuthenticatedUser>,
        res: Response<ChatDto, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
    deleteChat(
        req: Request<{ chatId: string }, { message: string }, object, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
    createMessage(
        req: Request<{ chatId: string }, { message: string }, MessageCreateBody, object, AuthenticatedUser>,
        res: Response<{ message: string }, AuthenticatedUser>,
        next: NextFunction,
    ): Promise<void>;
}

export interface ChatServiceContract {
    getChats(userId: number): Promise<ChatDto[]>;
    getChatMessages(userId: number, chatId: number): Promise<MessageDto[]>;
    createChat(userId: number, dto: ChatCreateBody): Promise<ChatDto>;
    updateChat(userId: number, chatId: number, dto: ChatUpdateBody): Promise<ChatDto>;
    deleteChat(userId: number, chatId: number): Promise<{ message: string }>;
    createMessage(userId: number, chatId: number, dto: MessageCreateBody): Promise<{ message: string }>;
}

export interface ChatRepositoryContract {
    getChatById(chatId: number): Promise<{ id: number; adminId: number | null; isGroup: boolean } | null>;
    createChat(adminId: number, dto: ChatCreateBody): Promise<ChatDto>;
    updateChat(chatId: number, dto: ChatUpdateBody): Promise<ChatDto>;
    deleteChat(chatId: number): Promise<void>;
    createMessage(chatId: number, senderId: number, dto: MessageCreateBody): Promise<void>;
    getMessagesByChatId(userId: number, chatId: number): Promise<MessageDto[]>;
    getChatsByUserId(userId: number): Promise<ChatDto[]>;
}