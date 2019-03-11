import { Injectable } from '../infrastructure/framework';

@Injectable()
export class Config {

  readonly db: {
    name: string;
    uri: string;
  };

  constructor() {
    Object.assign(this, {
      db: {
        name: process.env.DB_NAME,
        uri: process.env.DB_CONNECTION_STRING,
      }
    });
    Object.freeze(this);
  }
}
