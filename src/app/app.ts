import { Injectable, Server } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';
import { Config } from './config';

@Injectable()
export class Application {
  server: Server;

  constructor(
    private db: DbSource,
    private config: Config
  ) {
    this.server = Server.bootstrap();
    this.db.connect(
      this.config.db.uri,
      this.config.db.name
    );
  }
}
