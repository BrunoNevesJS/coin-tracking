export interface IClient {
    id: string;
    websocket: WebSocket;
};

export type MapClients = Map<WebSocket, string>;