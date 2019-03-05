import { Repository } from '../../domain/repository';
import { Entity } from '../../domain/entity';

export class GenericRepository<T extends Entity> implements Repository<T> {

  private collection: T[] = [];

  save(entity: T) {
    this.collection.push(entity);
    return entity;
  }

  findById(id: string) {
    return this.collection.find(e => e.id === id);
  }

  findAll() {
    return this.collection.slice();
  }

}