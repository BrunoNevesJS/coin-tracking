import { WebSocket } from 'ws';

export interface IServerWebSocket {
    execute: () => void;
    onListenerMessage: (ws: WebSocket) => void;
    onListenerClose: (ws: WebSocket) => void;
}