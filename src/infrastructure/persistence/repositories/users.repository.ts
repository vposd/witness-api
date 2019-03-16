import { BaseRepository } from '../db/base-repository.class';
import { DbSource } from '../db/db-source.service';
import { Injectable } from '../../framework';
import { Repository } from '../../../infrastructure/framework/db/decorators';
import { User } from '../../../app/auth/user';

@Repository({
  collectionName: 'users',
  entityType: User
})
@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(db: DbSource) {
    super(db);
  }
}
