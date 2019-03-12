import { OAuth2Strategy } from 'passport-google-oauth';
import passport from 'passport';

import { Injectable, Server, Injector } from '../infrastructure/framework';
import { DbSource } from '../infrastructure/persistence/db/db-source.service';
import { AgreementsController } from './api/controllers/agreements.controller';
import { UsersController } from './api/controllers/users.controller';
import { AuthController } from './api/controllers/auth.controller';
import { Config } from './config';

@Injectable()
export class Application {

  private server: Server;

  constructor(
    private db: DbSource,
    private config: Config
  ) {
    this.configAuth();
    this.registerControllers();
    this.server = Server.bootstrap();
    this.db.connect(
      this.config.db.uri,
      this.config.db.name
    );
  }

  private registerControllers() {
    Injector
      .init(AuthController)
      .init(AgreementsController)
      .init(UsersController);
  }

  private configAuth() {
    const GoogleStrategy = OAuth2Strategy;

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    passport.use(
      new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      (token, refreshToken, profile, done) => {
        return done(null, {
          profile,
          token
        });
      }));
  }

  static get server() {
    return Injector
      .get(Application)
      .server;
  }
}
