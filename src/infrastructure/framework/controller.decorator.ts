import { Type, GenericClassDecorator, HttpMethod, ControllerMethodMetadata } from './types';

const CONTROLLER_METADATA_KEY = Symbol('CONTROLLER_METADATA_KEY');

export const Controller = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, true, target);

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

export const isController = <T>(target: Type<T>) =>
  Reflect.getMetadata(CONTROLLER_METADATA_KEY, target) === true;
