import { Entity } from './entity';

export interface Repository<T extends Entity> {
  save(entity: T): T;
  findAll(): T[];
  findById(id: string): T;
}
