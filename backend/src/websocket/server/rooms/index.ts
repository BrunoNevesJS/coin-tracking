import { MapClients, IClient, MapRoom, Nullable } from './IRooms';

export class Rooms {
    rooms!: MapRoom;
    clients!: MapClients;

    constructor() { }

    joinRoom(room: string, client: IClient): boolean | never {
        const checkRoom = this.hasRoom(room);

        if (!room) throw Error('room cannot be empty');
        if (!client) throw Error('client cannot be empty');
        if (!checkRoom) throw Error('client cannot be empty');

        if (this.getRoom(room))
            this.rooms.get(room)?.push(client);
        else 
            this.createRoom(room);
        
        return true;
    }

    getRoom(room: string): Nullable<IClient[]> {
        if (!room) throw Error('room cannot be empty');

        return this.rooms.get(room);
    }

    createRoom(room: string) {
        this.rooms.set(room, []);
    }

    hasRoom(room: string): boolean | never {
        if (!room) throw Error('room not found');

        return this.rooms.has(room);
    }
}

export default Rooms;