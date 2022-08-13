import { MapRoom, Nullable } from './IRooms';
import { IClient } from '../clients/IClient';
import { removeDuplicateValuesFromArray } from '../../../utils/globalUtils';

export class Rooms {
    rooms: MapRoom = new Map<string, IClient[]>();

    constructor() { }

    joinRoom(id: string, client: IClient): boolean | never {
        const room = this.getRoomById(id);

        if (!id) throw Error('room cannot be empty');
        if (!client) throw Error('client cannot be empty');

        //TODO: bloquear client ja cadastrado, independente da sala

        if (room) {
            this.setClientIntoRoom(room, client);
        } else {
            const newRoom = this.createRoom(id);

            return newRoom ? this.setClientIntoRoom(newRoom, client) : false
        }

        return true;
    }

    getRoomById(id: string): Nullable<IClient[]> {
        return this.rooms.get(id);
    }

    createRoom(id: string): Nullable<IClient[]> {
        return this.rooms.set(id, []).get(id) ?? null;
    }

    hasRoom(id: string): boolean | never {
        if (!id) throw Error('room not found');

        return this.rooms.has(id);
    }

    setClientIntoRoom(room: IClient[], client: IClient): boolean {
        room.push(client);
        room = removeDuplicateValuesFromArray(room);

        return (room.length > 0) ?? false
    }

    searchClient(room: Nullable<IClient[]>, client: IClient): Nullable<number> {
        return room?.indexOf(client) ?? null;
    }

    leaveRoom(roomId: string, client: IClient): void {
        const room = this.getRoomById(roomId);
        const index = this.searchClient(room, client);

        if (typeof index === 'number') {
            room?.splice(index, 1);
        }
    }

    getRooms() {
        return this.rooms;
    }
}

export default Rooms;