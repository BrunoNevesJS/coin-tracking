const express = require("express");
const cors = require("cors");

import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    ws.on('message', (message: string) => {
        ws.send(`${message}`);
    });
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server?.address()} :)`);
});