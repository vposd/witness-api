import { Injectable } from '../../infrastructure/framework';
import { UsersRepository } from '../../infrastructure/persistence/repositories/users.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository
  ) { }

  add(user: User) {
    return this.usersRepository.save(user);
  }

  get(id: string) {
    return this.usersRepository.findById(id);
  }
}
