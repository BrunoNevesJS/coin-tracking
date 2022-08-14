import { App } from './app';

const port: number = Number(process.env.PORT) || 8999;

class Server {
    private app: App;

    constructor() {
        this.app = new App(port, []);

        this.listen();
    }

    private listen() {
        this.app.listen();
    }
}

new Server();