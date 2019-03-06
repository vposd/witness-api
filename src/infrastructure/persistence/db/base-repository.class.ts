import { Entity } from '../../../domain/entity';
import { MongoRepository } from './mongo-db/mongo-repository';

export class BaseRepository<T extends Entity> extends MongoRepository<T> {}
