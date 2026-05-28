export interface IChatClientEvents {
    'chat:join': (chatId: string, ack?: (response: { joined: boolean }) => void) => void;
    'chat:leave': (chatId: string, ack?: (response: { left: boolean }) => void) => void;
    'chat:message': (
        data: { chatId: string; message: string },
        ack?: (response: { delivered: boolean }) => void,
    ) => void;
}
