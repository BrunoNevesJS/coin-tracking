import { IClient } from "./clients/IClient";

export interface IServerWebSocket {
    execute: (callback?: Function) => void;
    onListenerMessage: (ws: WebSocket, client: IClient) => void;
    onListenerClose: (ws: WebSocket) => void;
}

export interface Message {
    action: string;
    roomId: string
}

export type EventOnMessage = MessageEvent<Message>

