import { MongoClient } from 'mongodb';

export class DatabaseClient {

  private client: MongoClient;

  async connect(uri: string) {

    if (this.client) {
      return this.client.db;
    }

    const client = await this.createClient(uri);
    this.client = client;

    return this.client.db();
  }

  async close() {
    const client = await this.client;
    client.close();
  }

  private createClient(uri: string) {
    return MongoClient.connect(uri, { useNewUrlParser: true });
  }
}
