import Express from 'express';
import http from 'http';

import { asyncHandler } from './api/handlers/async.handler';
import { ControllerMethodMetadata, METADATA_KEY } from './types';
import { Injector } from './di/injector';
import { isController } from './api/decorators';

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
      .listen(process.env.APP_PORT || 9000)
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

    const registerControllerMethods = (controller: any) =>
      (metadataList: ControllerMethodMetadata[]) =>
        metadataList
          .forEach(metadata => {
            this.router[metadata.httpMethod](
              metadata.path,
              ...metadata.middlewares,
              asyncHandler(metadata.descriptor.value.bind(controller))
            );
          });

    Injector
      .filter(isController)
      .forEach(([_, controller]) =>
        Reflect
          .getMetadataKeys(controller)
          .filter(key => key.toString() === METADATA_KEY.controllerMethod.toString())
          .map(httpMethod => Reflect.getMetadata(httpMethod, controller))
          .forEach(registerControllerMethods(controller))
      );

    this.app.use(this.router);
  }
}
