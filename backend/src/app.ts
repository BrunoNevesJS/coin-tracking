import * as express from 'express';
import * as bodyParser from 'body-parser';
import ServerWebSocket from './websocket/server';

export class App {
    public app: express.Application;
    public routes: Array<express.Router>;
    public port: number;

    constructor(port: number, routes: Array<express.Router>) {
        this.app = express();
        this.port = port;
        this.routes = routes;

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeWebSocketServer();
    }

    private initializeWebSocketServer() {
        ServerWebSocket.execute();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeRoutes() {
        this.routes.forEach( ({ route }) => {
            this.app.use('/' + route);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server inicializado na porta ${this.port}`);
        });
    }
}

export default App;