import { MongoDbContext } from './mongo-db/mongo-db-context';
import { Injectable } from '../../framework';

@Injectable()
export class DbSource extends MongoDbContext {}
