import { Injectable } from '../../infrastructure/framework';
import { UsersRepository } from '../../infrastructure/persistence/repositories/users.repository';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository
  ) { }

}
