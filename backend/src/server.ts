import * as http from 'http';
import { Duplex } from 'stream';
import * as WebSocket from 'ws';

const express = require("express");
const cors = require("cors");
const app = express();
const { wss, rooms } = require('./websocket')
const routes = require('./routes/index')

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

import ServerWebSocket from './websocket/server';

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server inicializado na porta ${(server.address() as WebSocket.AddressInfo).port}`);
    ServerWebSocket.execute();
});

server.on('upgrade', async (request: http.IncomingMessage, duplex: Duplex, buffer: Buffer) => {

    wss.handleUpgrade(request, duplex, buffer, (ws: WebSocket) => {
        wss.emit('connection', ws, request);
    });
});

app.get('/get', (req: any, res: any) => {
    const wsc = new WebSocket(`wss://stream.binance.com:9443/ws/${req.query.id}@trade`);

    wsc.onmessage = (event) => {
        rooms.get(req.query.id).forEach(({ws}: any) => {
            ws.send(`${event.data}`)
        })
    }
})

app.use('/', routes)