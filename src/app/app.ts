import { Injectable, Server, Injector } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';
import { AgreementsController } from './api/controllers/agreements.controller';
import { AuthController } from './api/controllers/auth.controller';
import { ParticipantsController } from './api/controllers/participants.controller';
import { Config } from './config';
import { AuthService } from './auth/auth.service';

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
      .init(ParticipantsController)
      .init(AgreementsController);
  }

  static get server() {
    return Injector
      .get(Application)
      .server;
  }
}
