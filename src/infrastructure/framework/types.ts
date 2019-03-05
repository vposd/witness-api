export type GenericClassDecorator<T> = (target: T) => void;

export interface Type<T> {
  new(...args: any[]): T;
}

export enum ClassType {
  Controller = 'Controller'
}

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete'
}

export interface ControllerMethodMetadata {
  method: HttpMethod;
  propertyKey: string;
  path: string;
  target: any;
  descriptor: PropertyDescriptor;
}
