import { Injectable, Server, Injector } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';
import { AgreementsController } from './api/controllers/agreements.controller';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './api/auth/auth.service';
import { Config } from './config';

@Injectable()
export class Application {

  private server: Server;

  constructor(
    private db: DbSource,
    private config: Config,
    private authService: AuthService
  ) {
    this.initialize();
  }

  private async initialize() {
    this.db.connect(
      this.config.db.uri,
      this.config.db.name
    );
    this.authService.configAuth();
    this.registerControllers();
    this.server = Server.bootstrap();
  }

  private registerControllers() {
    Injector
      .init(AuthController)
      .init(AgreementsController);
  }

  static get server() {
    return Injector
      .get(Application)
      .server;
  }
}
