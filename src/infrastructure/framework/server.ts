import Express from 'express';
import http from 'http';
import { Injector } from './di/injector';
import { ControllerMethodMetadata } from './types';
import { isController } from './controller.decorator';
import { asyncMiddleware } from '../helpers/async-middleware';

type ConfigFn = (app: Express.Application) => void;

export class Server {

  private configFn: ConfigFn;
  private errorConfigFn: ConfigFn;
  private router: Express.Router;
  private httpServer: http.Server;

  static bootstrap(): Server {
    return new Server;
  }

  constructor(
    private app: Express.Application = Express()
  ) {
    this.router = Express.Router();
  }

  build() {
    this.configFn.call(undefined, this.app);
    this.registerControllers();
    this.errorConfigFn.call(undefined, this.app);
    return this;
  }

  start() {
    this.httpServer = http
      .createServer(this.app)
      .listen(this.app.get('port'))
      .on('error', error => {
        throw error;
      })
      .on('listening', () => {
        const address = this.httpServer.address();
        const bind = typeof address === 'string'
          ? 'pipe ' + address
          : 'port ' + address.port;
        console.log('Listening on ' + bind);
      });
  }

  config(configFn: ConfigFn) {
    this.configFn = configFn;
    return this;
  }

  errorConfig(errorConfigFn: ConfigFn) {
    this.errorConfigFn = errorConfigFn;
    return this;
  }

  private registerControllers() {
    Injector
      .filter(isController)
      .forEach(([_, controller]) => {
        Reflect
          .getMetadataKeys(controller)
          .map(key => Reflect.getMetadata(key, controller))
          .forEach((metadata: ControllerMethodMetadata) =>
            this.router[metadata.method](
              metadata.path,
              asyncMiddleware(metadata.descriptor.value.bind(controller))
            )
          );
        }
      );

    this.app.use(this.router);
  }
}
