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

export interface RepositoryConfig<T> {
  collectionName: string;
  entityType: T;
}

export interface RepositoryMetadata<T> extends RepositoryConfig<T> {}

export const METADATA_KEY = {
  injectable: Symbol('injectable'),
  repository: Symbol('repository'),
  controller: Symbol('controller'),
  controllerMethod: Symbol('controllerMethod')
};

export type Middleware = RequestHandler;