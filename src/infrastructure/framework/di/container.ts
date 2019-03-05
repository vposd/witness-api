import 'reflect-metadata';
import { Type } from '../types';

type ContainerFilterFn<T> = (instance: T, token: Type<T>) => boolean;

export const Container = new class {

  private instances = new Map<Type<any>, any>();

  filter(filterFn: ContainerFilterFn<any>) {
    return Array
      .from(this.instances)
      .filter(([instance, token]) => filterFn(instance, token));
  }

  bind<T>(target: Type<T>) {
    this.resolve(target);
    return this;
  }

  get<T>(target: Type<T>): T {
    const tokens: Type<T>[] = Reflect.getMetadata('design:paramtypes', target) || [];
    const dependencies = tokens.map(token => this.resolve(token));
    return new target(...dependencies);
  }

  private resolve<T>(target: Type<T>) {
    const resolved = this.instances.get(target);

    if (resolved) {
      return resolved;
    }

    const instance = Container.get<T>(target);
    this.instances.set(target, instance);

    return instance;
  }

};
