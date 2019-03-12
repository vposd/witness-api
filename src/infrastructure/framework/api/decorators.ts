import { Type, GenericClassDecorator, ControllerMethodMetadata, Middleware, HttpMethod } from '../types';
import { METADATA_KEY } from '../constants';
import { protectMethodHandler } from './handlers/protect-method.handler';

export const Controller = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(METADATA_KEY.controller, true, target);

export const isController = <T>(target: Type<T>) =>
  Reflect.getMetadata(
    METADATA_KEY.controller,
    target
  ) === true;

export const Get = (path: string, ...middlewares: Middleware[]) => defineMethodMetadata(HttpMethod.get, path, middlewares);

export const Post = (path: string, ...middlewares: Middleware[]) => defineMethodMetadata(HttpMethod.post, path, middlewares);

export const Patch = (path: string, ...middlewares: Middleware[]) => defineMethodMetadata(HttpMethod.patch, path, middlewares);

export const Put = (path: string, ...middlewares: Middleware[]) => defineMethodMetadata(HttpMethod.put, path, middlewares);

export const Delete = (path: string, ...middlewares: Middleware[]) => defineMethodMetadata(HttpMethod.delete, path, middlewares);

export const Authorize = (target: any, propertyKey: string) => {
  const controllerMethodMetadata = (Reflect.getMetadata(METADATA_KEY.controllerMethod, target) || [])
    .map((metadata: ControllerMethodMetadata) => {
      if (metadata.propertyKey !== propertyKey) {
        return metadata;
      }

      return {
        ...metadata,
        middlewares: [
          protectMethodHandler,
          ...metadata.middlewares
        ]
      };
    });

  Reflect.defineMetadata(
    METADATA_KEY.controllerMethod,
    controllerMethodMetadata,
    target
  );
};

const defineMethodMetadata = (httpMethod: HttpMethod, path: string, middlewares: Middleware[]) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const methodMetadata: ControllerMethodMetadata = {
      descriptor,
      middlewares,
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
