import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IServerWebSocket } from './IServerWebSocket';

export class ServerWebSocket implements IServerWebSocket {
    private wss: WebSocketServer;

    constructor() {
        this.wss = new WebSocketServer({ port: 8997 });
    }

    public execute = () => {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log("Client conectado");

            this.onListenerMessage(ws);
            this.onListenerClose(ws);
        })
    }

    public onListenerMessage = (ws: WebSocket) => {
        ws.on('message', (message: RawData) => {
            console.log(message.toString());
        })
    }

    public onListenerClose = (ws: WebSocket) => {
        ws.on('close', () => {
            console.log("Client encerrado");
        })
    }
}

export default new ServerWebSocket();