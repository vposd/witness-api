import { Type, GenericClassDecorator, METADATA_KEY, RepositoryConfig } from '../types';

export const Repository = (repositoryConfig: RepositoryConfig<Type<object>>): GenericClassDecorator<Type<object>> =>
  (target: Type<object>) =>
    Reflect.defineMetadata(METADATA_KEY.repository, repositoryConfig, target);