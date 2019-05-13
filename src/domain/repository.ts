import { Entity } from './entity';

export interface Repository<T extends Entity> {
  save(entity: T): Promise<T>;
  find(req: object): Promise<T[]>;
  findOne(condition: object): Promise<T>;
  findById(id: string): Promise<T>;
  findManyById(ids: string[]): Promise<T[]>;
  deleteById(id: string): Promise<void>;
}
