import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '../../framework';
import { BaseRepository } from '../db/base-repository.class';
import { DbSource } from '../db/db-source.service';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(db: DbSource) {
    super(db);
  }
}
