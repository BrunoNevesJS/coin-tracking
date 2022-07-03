import { IClient, MapClients } from '../clients/IClient';

export class Clients {
    clients: MapClients = new Map<WebSocket, string>();

    constructor({ id, websocket }: IClient) {
        this.createClient(id, websocket);
    }

    createClient(id: string, ws: WebSocket){
        this.clients.set(ws, id);
    }

    getClientByWebSocket(ws: WebSocket): string {
       return this.clients?.get(ws) ?? ''
    }
}

export default Clients;