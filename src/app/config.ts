import { Injectable } from '../infrastructure/framework';

@Injectable()
export class Config {

  readonly db: {
    name: string;
    uri: string;
  };

  constructor() {
    Object.assign(this, require('../config.json'));
    Object.freeze(this);
  }
}
