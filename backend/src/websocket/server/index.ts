import { WebSocketServer } from 'ws';

import Clients from './clients';
import Rooms from './rooms';
import {
    IServerWebSocket,
    EventOnMessage,
    Message
} from './IServerWebSocket';
import { IClient } from './clients/IClient';

export class ServerWebSocket implements IServerWebSocket {
    private wss: WebSocketServer;
    private rooms: Rooms;

    constructor() {
        this.wss = new WebSocketServer({ port: 8997 });
        this.rooms = new Rooms();
    }

    public execute = (callback?: Function) => {
        this.wss.on('connection', (ws: WebSocket) => {
            if (callback) callback();

            const client = Clients.createClient(ws);

            this.onListenerMessage(client);
            this.onListenerClose(ws);
        })
    }

    public onListenerMessage = (client: IClient) => {
        client.websocket.onmessage = (event: EventOnMessage) => {
            try {
                const { action, roomId } = JSON.parse(event.data.toString()) as Message;

                switch (action) {
                    case 'join':
                        this.rooms.joinRoom(roomId, client);
                        break;

                    case 'leave':
                        this.rooms.leaveRoom(roomId, client);
                        break;

                    case 'check':
                        this.rooms.getRooms();
                        break;
                }

            } catch (error) {
                console.error(error);
            }
        };
    }

    public onListenerClose = (ws: WebSocket) => {
        ws.onclose = function (event) {
        };
    }

    public getRooms = (): Rooms => this.rooms;

    public close = () => {
        const { rooms } = this.getRooms();
        //TODO: fechar todas as websocket e deletar
        this.rooms = new Rooms();
    }
}

export default new ServerWebSocket();