export interface IServerWebSocket {
    execute: (callback?: Function) => void;
    onListenerMessage: (ws: WebSocket) => void;
    onListenerClose: (ws: WebSocket) => void;
}

export type EventOnMessage = MessageEvent<{
    action: string,
    roomId: string
}>