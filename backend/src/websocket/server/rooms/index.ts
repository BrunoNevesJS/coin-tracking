import { MapRoom, Nullable } from './IRooms';
import { IClient } from '../clients/IClient';

export class Rooms {
    rooms: MapRoom = new Map<string, IClient[]>();

    constructor() { }

    joinRoom(id: string, client: IClient): boolean | never {
        const room: Nullable<IClient[]> = this.getRoomById(id);

        if (!id) throw Error('room cannot be empty');
        if (!client) throw Error('client cannot be empty');

        if (room) {
            this.setClientIntoRoom(room, client);
        } else {
            const newRoom = this.createRoom(id);
            this.setClientIntoRoom(newRoom, client);
        }
        
        return true;
    }

    getRoomById(id: string): Nullable<IClient[]> {
        return this.rooms.get(id);
    }

    createRoom(id: string): Nullable<IClient[]> {
        this.rooms.set(id, []);

        return this.rooms.get(id);
    }

    hasRoom(id: string): boolean | never {
        if (!id) throw Error('room not found');

        return this.rooms.has(id);
    }

    setClientIntoRoom(room: Nullable<IClient[]>, client: IClient): void {
        room?.push(client);
    }

    searchClient(room: Nullable<IClient[]>, clint: IClient) {
        //room?.find(clint);
    }
}

export default new Rooms();