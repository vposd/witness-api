import { Injectable, Server } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';

@Injectable()
export class Application {
  server: Server;

  constructor(
    private db: DbSource
  ) {
    this.server = Server.bootstrap();
    this.db.connect('');
  }
}
