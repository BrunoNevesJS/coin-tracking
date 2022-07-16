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

    constructor() {
        this.wss = new WebSocketServer({ port: 8997 });
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
                        Rooms.joinRoom(roomId, client);
                    break;
                }

            } catch (error) {
                console.error(error);
            }
        };
    }

    public onListenerClose = (ws: WebSocket) => {
        ws.onclose = function(event) {
            console.log(event)
        };
    }
}

export default new ServerWebSocket();