import { MongoClient, Db } from 'mongodb';
import { Deferred } from '../../../helpers/deferred.class';
import { DbContext } from '../db-context.interface';

export class MongoDbContext implements DbContext<MongoClient, Db> {

  get client() {
    return this.clientPromise;
  }

  get db() {
    return this.client
      .then(client => client.db('mflix'));
  }

  private clientPromise: Promise<MongoClient>;
  private clientDeffered: Deferred<MongoClient>;

  constructor() {
    this.clientDeffered = new Deferred<MongoClient>();
    this.clientPromise = this.clientDeffered.promise;
  }

  async connect(uri: string) {
    try {
      const client = await this.createClient(uri);
      this.clientDeffered.resolve(client);
    } catch (error) {
      this.clientDeffered.reject(error);
    }

    return this.clientPromise;
  }

  async close() {
    const client = await this.client;
    return client.close();
  }

  private createClient(uri: string) {
    return MongoClient.connect(uri, { useNewUrlParser: true });
  }
}
