import { RequestHandler } from 'express';

export type GenericClassDecorator<T> = (target: T) => void;

export interface Type<T> {
  new(...args: any[]): T;
}

export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete'
}

export interface ControllerMethodMetadata {
  httpMethod: HttpMethod;
  propertyKey: string;
  path: string;
  target: any;
  descriptor: PropertyDescriptor;
  middlewares: Middleware[];
}

export const METADATA_KEY = {
  authorize: Symbol('authorize'),
  injectable: Symbol('injectable'),
  controller: Symbol('controller'),
  controllerMethod: Symbol('controllerMethod')
};

export type Middleware = RequestHandler;