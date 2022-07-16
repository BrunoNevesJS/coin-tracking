import { WebSocketServer } from 'ws';

import Clients from './clients';
import { IServerWebSocket, EventOnMessage } from './IServerWebSocket';

export class ServerWebSocket implements IServerWebSocket {
    private wss: WebSocketServer;

    constructor() {
        this.wss = new WebSocketServer({ port: 8997 });
    }

    public execute = (callback?: Function) => {
        this.wss.on('connection', (ws: WebSocket) => {
            if (callback) callback();

            Clients.createClient(ws);
    
            this.onListenerMessage(ws);
            this.onListenerClose(ws);
        })
    }

    public onListenerMessage = (ws: WebSocket) => {
        ws.onmessage = (event: EventOnMessage) => {
            try {
                const { action, room } = JSON.parse(event.data.toString());
                console.log(action, room);

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