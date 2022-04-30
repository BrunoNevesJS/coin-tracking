import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8998 });
const clients = new Map();
const rooms = new Map();

wss.on('connection', (ws: WebSocket) => {
    const id = uuidv4();
    clients.set(ws, id);

    ws.on('message', (message: WebSocket.RawData) => {
        const { crypto, action } = JSON.parse(message.toString())

        switch (action) {
            case 'join':
                if (!rooms.has(crypto)) rooms.set(crypto, []);
                if (!rooms.get(crypto).includes(clients.get(ws))) rooms.get(crypto).push({client: clients.get(ws), ws});
            break;
            case 'close':
                const index = rooms.get(crypto).indexOf(clients.get(ws))
                rooms.get(crypto).splice(index, 1);
                // TODO: Excluir room quando não existir mais clients conectados ao socket
            break;
        }
        console.log(clients.get(ws));
    });

    ws.send('Client conectado com sucesso')

    ws.on("close", () => {
        clients.delete(ws);
    });
})

module.exports = { wss, rooms };