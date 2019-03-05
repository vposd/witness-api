import { Type, GenericClassDecorator, HttpMethod, ClassType, ControllerMethodMetadata } from './types';

export const Controller = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(ClassType.Controller, undefined, target);

const defineMethodMetadata = (method: HttpMethod, path: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    Reflect.defineMetadata(
      method,
      {
        method,
        propertyKey,
        path,
        target,
        descriptor
      } as ControllerMethodMetadata,
      target
    );

export const Get = (path: string) => defineMethodMetadata(HttpMethod.Get, path);

export const Post = (path: string) => defineMethodMetadata(HttpMethod.Post, path);

export const Patch = (path: string) => defineMethodMetadata(HttpMethod.Patch, path);

export const Put = (path: string) => defineMethodMetadata(HttpMethod.Put, path);

export const Delete = (path: string) => defineMethodMetadata(HttpMethod.Delete, path);
