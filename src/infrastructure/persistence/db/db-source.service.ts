import { Injectable } from '../../framework';
import { MongoDbContext } from './mongo-db/mongo-db-context';

@Injectable()
export class DbSource extends MongoDbContext {}
