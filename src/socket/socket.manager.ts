import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { ISocketManager, ServerSocket, SocketIOServer } from './socket.types';
import { PrismaClient as prisma } from '../prisma/client';


export class SocketManager implements ISocketManager {
    private readonly socketIOServer: SocketIOServer;
    private readonly userSockets = new Map<string, Set<string>>();

    constructor(httpServer: HttpServer) {
        this.socketIOServer = new Server(httpServer, {
            cors: { origin: '*', methods: ['GET', 'POST'] },
        });
        this.initConnection();
    }

    public initConnection(): void {
        this.socketIOServer.on('connection', (socket: ServerSocket) => {
            console.log(`Client connected: ${socket.id}`);

            socket.on('user:online', (userId, ack) => {
                socket.data.userId = userId;
                if (!this.userSockets.has(userId)) this.userSockets.set(userId, new Set());
                this.userSockets.get(userId)!.add(socket.id);
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

            socket.on('chat:message', async (data, ack) => {
                const payload = {
                    userId:  socket.data.userId || 'unknown',
                    chatId:  data.chatId,
                    message: data.message,
                };

                socket.to(data.chatId).emit('chat:new-message', payload);

                try {
                    const chatId = Number(data.chatId);
                    const chat = await prisma.chat.findUnique({
                        where:  { id: chatId },
                        select: { users: { select: { id: true } } },
                    });
                    if (chat) {
                        for (const user of chat.users) {
                            const userIdStr = String(user.id);
                            if (userIdStr === socket.data.userId) continue;
                            const socketIds = this.userSockets.get(userIdStr);
                            if (!socketIds) continue;
                            for (const sid of socketIds) {
                                const targetSocket = this.socketIOServer.sockets.sockets.get(sid);
                                if (targetSocket && !targetSocket.rooms.has(data.chatId)) {
                                    targetSocket.emit('chat:new-message', payload);
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.error('chat:message error:', e);
                }

                ack?.({ delivered: true });
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
                if (socket.data.userId) {
                    const sockets = this.userSockets.get(socket.data.userId);
                    if (sockets) {
                        sockets.delete(socket.id);
                        if (sockets.size === 0) this.userSockets.delete(socket.data.userId);
                    }
                    this.socketIOServer.emit('user:disconnected', socket.data.userId);
                }
            });
        });
    }
}