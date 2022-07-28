import WebSocket = require("ws");

import ServerWebSocket from ".";
import { convertObjectToBuffer } from '../../utils/buffer';
import { Message } from "./IServerWebSocket";

const PORT = 8997;

describe("WebSocket Server", () => {

    beforeAll(() => {
        ServerWebSocket.execute();
    });

    afterAll(() => {
        ServerWebSocket.close();
    });

    test('should connect to websocket server and create new room 123', (done) => {
        const ws = new WebSocket(`ws://localhost:${PORT}`);

        ws.onopen = () => {
            const message: Message = { roomId: '123', action: 'join' };
            const buffer = convertObjectToBuffer(message);

            ws.send(buffer);

            setTimeout(() => {
                const { rooms } = ServerWebSocket.getRooms();

                done(expect(rooms.size).toBe(1));
                ws.close();
            }, 3000)
        };
    }, 5000);

    test('should connect new client to websocket server and it join to room 132', (done) => {
        const ws = new WebSocket(`ws://localhost:${PORT}`);

        ws.onopen = () => {
            const message: Message = { roomId: '123', action: 'join' };
            const buffer = convertObjectToBuffer(message);

            ws.send(buffer);

            setTimeout(() => {
                const { rooms } = ServerWebSocket.getRooms();

                done(expect(rooms.get('123')?.length).toBe(2));
                ws.close();
            }, 3000)
        };
    }, 5000);

    test('1111111', (done) => {
        const { rooms: { size } } = ServerWebSocket.getRooms();

        done(expect(size).toBe(1));
    }, 5000);
});

describe("WebSocket Server", () => {

    beforeAll(async () => {
        ServerWebSocket.execute();

        const ws = new WebSocket(`ws://localhost:${PORT}`);
        ws.onopen = () => {
            const message: Message = { roomId: '124', action: 'join' };
            const buffer = convertObjectToBuffer(message);

            ws.send(buffer);
        };
    });

    test('should connect to websocket server and create new room 1234', (done) => {
        const ws = new WebSocket(`ws://localhost:${PORT}`);

        ws.onopen = () => {
            const message: Message = { roomId: '123', action: 'join' };
            const buffer = convertObjectToBuffer(message);

            ws.send(buffer);

            setTimeout(() => {
                const { rooms } = ServerWebSocket.getRooms();

                done(expect(rooms.size).toBe(2));
                ws.close();
            }, 3000)
        };
    }, 5000);

});