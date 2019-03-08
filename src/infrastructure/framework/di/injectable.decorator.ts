import { Type, GenericClassDecorator } from '../types';

export const INJECTABLE_METADATA_KEY = Symbol('INJECTABLE_METADATA_KEY');

export const Injectable = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);

export const isInjectable = <T>(target: Type<T>) =>
  Reflect.getMetadata(INJECTABLE_METADATA_KEY, target) === true;