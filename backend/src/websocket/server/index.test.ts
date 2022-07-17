import WebSocket = require("ws");

import ServerWebSocket from ".";
import { convertObjectToBuffer } from '../../utils/buffer';
import { Message } from "./IServerWebSocket";

const PORT = 8997;

describe("WebSocket Server", () => {

    beforeAll(async () => {
        ServerWebSocket.execute();
    });

    test('should connect to websocket server and create new room', (done) => {
        const ws = new WebSocket(`ws://localhost:${PORT}`);

        ws.onopen = () => {
            const message: Message = { roomId: '123', action: 'join' };
            const buffer = convertObjectToBuffer(message);

            ws.send(buffer);

            setTimeout(() => {
                const { rooms } = ServerWebSocket.getRooms();

                done(expect(rooms.size).toBe(1));
            }, 3000)
        };
    }, 5000);
});