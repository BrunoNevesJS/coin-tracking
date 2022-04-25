"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients
            .forEach((client) => {
            client.send(`Client enviou mensagem: ${message}`);
        });
    });
    ws.send('Client conectado com sucesso');
});
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server inicializado na porta ${server.address().port}`);
});
//# sourceMappingURL=server.js.map