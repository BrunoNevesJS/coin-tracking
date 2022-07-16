import { v4 as uuidv4 } from 'uuid';

import { IClient, MapClients } from '../clients/IClient';

export class Clients {
    clients: MapClients = new Map<WebSocket, string>();

    public createClient(ws: WebSocket) {
        const id = uuidv4();
        this.clients.set(ws, id);

        return <IClient> { 
            websocket: ws,
            id
        };
    }

    public getClientByWebSocket(ws: WebSocket): string | null {
       return this.clients?.get(ws) ?? null
    }
}

export default new Clients();