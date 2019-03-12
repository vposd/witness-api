import { Type, GenericClassDecorator, METADATA_KEY } from '../types';

export const Injectable = (): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(METADATA_KEY.injectable, true, target);

export const isInjectable = <T>(target: Type<T>) =>
  Reflect.getMetadata(METADATA_KEY.injectable, target) === true;