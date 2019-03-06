import { Collection, ObjectID } from 'mongodb';
import { Repository } from '../../../../domain/repository';
import { Entity } from '../../../../domain/entity';
import { MongoDbContext } from './mongo-db-context';

export class MongoRepository<T extends Entity> implements Repository<T> {

  constructor(
    public dbContext: MongoDbContext
  ) { }

  async save(entity: T) {
    const collection = await this.collection;
    await collection.insertOne(entity);
    return entity;
  }

  async find(conditions: object) {
    const collection = await this.collection;
    const cursor = collection.find(conditions);
    return await cursor.toArray();
  }

  async findOne(conditions: object) {
    const collection = await this.collection;
    const cursor = collection.find(conditions).limit(1);

    const res = await cursor.toArray();
    if (res && res.length) {
      const document = res[0];
      return document;
    }
  }

  async findById(id: string) {
    const collection = await this.collection;
    return collection.findOne({ _id: new ObjectID(id) });
  }

  async deleteById(id: string) {
    throw new Error('Method not implemented.');
  }

  private get collection(): Promise<Collection<T>> {
    return new Promise<Collection<T>>(async (resolve, reject) => {
      const db = await this.dbContext.db;
      db.collection('collection', { strict: true }, async (err, collection) => {
        let ourCollection = collection;

        if (!err) {
          resolve(ourCollection);
        }

        try {
          ourCollection = await db.createCollection('collection');
        } catch (createErr) {
          reject(createErr);
        }
      });
    });
  }

}
