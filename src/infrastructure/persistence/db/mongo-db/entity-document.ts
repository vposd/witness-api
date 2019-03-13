import { ObjectID } from 'mongodb';

import { Entity } from '../../../../domain/entity';

export class EntityDocument extends Entity {
  _id?: ObjectID;
}