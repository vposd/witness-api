import { Injectable, Server, Injector } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';
import { AgreementsController } from './api/controllers/agreements.controller';
import { UsersController } from './api/controllers/users.controller';
import { Config } from './config';

@Injectable()
export class Application {

  private server: Server;

  constructor(
    private db: DbSource,
    private config: Config
  ) {
    this.registerControllers();
    this.server = Server.bootstrap();
    this.db.connect(
      this.config.db.uri,
      this.config.db.name
    );
  }

  private registerControllers() {
    Injector
      .init(AgreementsController)
      .init(UsersController);
  }

  static get server() {
    return Injector
      .get(Application)
      .server;
  }
}
