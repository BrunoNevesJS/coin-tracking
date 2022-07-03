export interface IClient {
    id: string;
    websocket: WebSocket;
};

export type MapRoom = Map<string, IClient[]>;

export type MapClients = Map<WebSocket, string>;

export type Nullable<T> = T | null | undefined;