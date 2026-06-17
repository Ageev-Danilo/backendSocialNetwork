import { Socket, Server } from 'socket.io';
import { IUserClientEvents } from '../modules/user/types/user.types';
import { IChatClientEvents } from '../modules/chat/chat.types';


export interface IServerToClientEvents {
    'chat:new-message': (data: { userId: string; chatId: string; message: string }) => void;
    'user:connected':    (userId: string) => void;
    'user:disconnected': (userId: string) => void;
}

export interface IInterServerEvents {
    ping: () => void;
}

export interface ISocketData {
    userId?: string;
}

export interface IClientToServerEvents extends IUserClientEvents, IChatClientEvents {}

export type ServerSocket = Socket<
    IClientToServerEvents,
    IServerToClientEvents,
    IInterServerEvents,
    ISocketData
>;

export type SocketIOServer = Server<
    IClientToServerEvents,
    IServerToClientEvents,
    IInterServerEvents,
    ISocketData
>;

export interface ISocketManager {
    initConnection(): void;
}