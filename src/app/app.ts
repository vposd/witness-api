import { Injectable, Server } from '../infrastructure/framework';

@Injectable()
export class Application {
  server: Server;

  constructor() {
    this.server = Server.bootstrap();
  }
}
