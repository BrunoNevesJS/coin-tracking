import * as WebSocket from 'ws';

const WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 8998 })

const clients = new Map();

const wsc = new WebSocket("wss://stream.binance.com:9443/ws/btcbusd@bookTicker");

wsc.onmessage = (event) => {
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(`${event.data}`)
    });
}
 
wss.on('connection', (ws: WebSocket) => {
    const id = clients.size + 1;
    clients.set(ws, id);

    ws.on('message', (message: string) => {
        console.log(clients.get(ws), message);
    });

    ws.send('Client conectado com sucesso')

    ws.on("close", () => {
        clients.delete(ws);
    });
})

exports.module = wss;