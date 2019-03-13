import { Type, GenericClassDecorator, ControllerMethodMetadata, Middleware as MiddlewareType, HttpMethod } from '../types';
import { METADATA_KEY } from '../constants';
import { protectMethodHandler } from './handlers/protect-method.handler';

const addMiddleware = (middleware: MiddlewareType) =>
  (target: any, propertyKey: string) => {
    const controllerMethodMetadata = (Reflect.getMetadata(METADATA_KEY.controllerMethod, target) || [])
      .map((metadata: ControllerMethodMetadata) => {
        if (metadata.propertyKey !== propertyKey) {
          return metadata;
        }

        return {
          ...metadata,
          middlewares: [
            ...metadata.middlewares,
            middleware
          ]
        };
      });

    Reflect.defineMetadata(
      METADATA_KEY.controllerMethod,
      controllerMethodMetadata,
      target
    );
  };

const defineMethodMetadata = (httpMethod: HttpMethod, path: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const methodMetadata: ControllerMethodMetadata = {
      descriptor,
      middlewares: [],
      httpMethod,
      propertyKey,
      path,
      target,
    };

    const metadataList = Reflect.hasMetadata(METADATA_KEY.controllerMethod, target)
      ? [...Reflect.getMetadata(METADATA_KEY.controllerMethod, target), methodMetadata]
      : [methodMetadata];

    Reflect.defineMetadata(
      METADATA_KEY.controllerMethod,
      metadataList,
      target
    );
  };

export const Controller = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(METADATA_KEY.controller, true, target);

export const isController = <T>(target: Type<T>) =>
  Reflect.getMetadata(
    METADATA_KEY.controller,
    target
  ) === true;

export const Get = (path: string) => defineMethodMetadata(HttpMethod.get, path);
export const Post = (path: string) => defineMethodMetadata(HttpMethod.post, path);
export const Patch = (path: string) => defineMethodMetadata(HttpMethod.patch, path);
export const Put = (path: string) => defineMethodMetadata(HttpMethod.put, path);
export const Delete = (path: string) => defineMethodMetadata(HttpMethod.delete, path);

export const Middleware = addMiddleware;
export const Authorize = addMiddleware(protectMethodHandler);
