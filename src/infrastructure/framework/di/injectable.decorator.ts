import { Type, GenericClassDecorator } from '../types';

export const Injectable = (): GenericClassDecorator<Type<object>> => {
  return (target: Type<object>) => { };
};
