import { validate } from '../infrastructure/helpers/validator';

export abstract class Entity {

  id: string;

  async validate() {
    return validate(this);
  }
}
