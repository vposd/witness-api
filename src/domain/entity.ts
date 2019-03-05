import uuid from 'uuid/v1';

export abstract class Entity {
  id: string;

  constructor() {
    this.id = uuid();
  }
}
