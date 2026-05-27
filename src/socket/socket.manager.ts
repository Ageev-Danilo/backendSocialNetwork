import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

import { ISocketManager, ServerSocket, SocketIOServer } from './socket.types';

export class SocketManager implements ISocketManager {
    private readonly socketIOServer: SocketIOServer;

    constructor(httpServer: HttpServer) {
        this.socketIOServer = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        this.initConnection();
    }

    public initConnection(): void {
        this.socketIOServer.on('connection', (socket: ServerSocket) => {
            console.log(`Client connected: ${socket.id}`);

            socket.on('user:online', (userId, ack) => {
                socket.data.userId = userId;

                console.log(`User online: ${userId}`);

                ack?.({ success: true });
            });

            socket.on('chat:join', (chatId, ack) => {
                socket.join(chatId);

                console.log(`Socket ${socket.id} joined ${chatId}`);

                ack?.({ joined: true });
            });

            socket.on('chat:leave', (chatId, ack) => {
                socket.leave(chatId);

                console.log(`Socket ${socket.id} left ${chatId}`);

                ack?.({ left: true });
            });

            socket.on('chat:message', (data, ack) => {
                this.socketIOServer.to(data.chatId).emit('chat:new-message', {
                    userId: socket.data.userId || 'unknown',
                    message: data.message,
                });

                ack?.({ delivered: true });
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);

                if (socket.data.userId) {
                    this.socketIOServer.emit('user:disconnected', socket.data.userId);
                }
            });
        });
    }
}
