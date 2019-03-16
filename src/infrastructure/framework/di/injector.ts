import 'reflect-metadata';

import { isInjectable } from './decorators';
import { Type } from '../types';

type InjectorFilterFn<T> = (instance: T, constructor: Type<T>) => boolean;

const REFLECT_PARAMS = 'design:paramtypes';

export const Injector = new class {

  private store = new Map<Type<any>, any>();

  filter(filterFn: InjectorFilterFn<any>) {
    return Array
      .from(this.store)
      .filter(([instance, constructor]) => filterFn(instance, constructor));
  }

  init<T>(target: Type<T>) {
    this.resolve(target);
    return this;
  }

  get<T>(target: Type<T>): T {
    const tokens: Type<T>[] = Reflect.getMetadata(REFLECT_PARAMS, target) || [];
    const dependencies = tokens.map(
      (token, index) => {
        this.checkCircularDependency(target, token, index);
        this.checkInjectable(token);
        return this.resolve(token);
      }
    );
    return new target(...dependencies);
  }

  private resolve<T>(token: Type<T>) {
    const resolved = this.store.get(token);

    if (resolved) {
      return resolved;
    }

    const instance = this.get<T>(token);
    this.store.set(token, instance);

    return instance;
  }

  private checkCircularDependency<T>(target: Type<T>, token: Type<T>, index: number) {
    if (token === undefined) {
      throw new Error(
        `[Injection error] Recursive dependency detected in constructor for type ${
          target.name
        } with parameter at index ${index}`
      );
    }
  }

  private checkInjectable<T>(token: Type<T>) {
    if (!isInjectable(token)) {
      throw new Error(
        `[Injection error] Cannot provide ${token.name}, ${token.name} isn't injectable`
      );
    }
  }

};
