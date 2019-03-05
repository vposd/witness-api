import 'reflect-metadata';
import { Type } from '../types';

type ContainerFilterFn<T> = (instance: T, constructor: Type<T>) => boolean;

export const Container = new class {

  private store = new Map<Type<any>, any>();

  filter(filterFn: ContainerFilterFn<any>) {
    return Array
      .from(this.store)
      .filter(([instance, constructor]) => filterFn(instance, constructor));
  }

  bind<T>(target: Type<T>) {
    this.resolve(target);
    return this;
  }

  get<T>(target: Type<T>): T {
    const tokens: Type<T>[] = Reflect.getMetadata('design:paramtypes', target) || [];
    const dependencies = tokens.map(constructor => this.resolve(constructor));
    return new target(...dependencies);
  }

  private resolve<T>(target: Type<T>) {
    const resolved = this.store.get(target);

    if (resolved) {
      return resolved;
    }

    const instance = this.get<T>(target);
    this.store.set(target, instance);

    return instance;
  }

};
