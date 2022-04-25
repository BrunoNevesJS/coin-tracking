import * as http from 'http';
import { Duplex } from 'stream';
import * as WebSocket from 'ws';

const express = require("express");
const cors = require("cors");
const app = express();
const wss = require('./websocket')

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server inicializado na porta ${(server.address() as WebSocket.AddressInfo).port}`);
});

server.on('upgrade', async (request: http.IncomingMessage, duplex: Duplex, buffer: Buffer) => {

    wss.handleUpgrade(request, duplex, buffer, (ws: WebSocket) => {
        wss.emit('connection', ws, request);
    });
});
