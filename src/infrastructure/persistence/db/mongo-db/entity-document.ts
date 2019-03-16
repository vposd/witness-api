import { ObjectID } from 'mongodb';

export class EntityDocument extends Object {
  id?: string;
  _id?: ObjectID;
}
