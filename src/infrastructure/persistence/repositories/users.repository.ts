import { GenericRepository } from '../generic-repository';
import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '../../framework';

@Injectable()
export class UsersRepository extends GenericRepository<User> { }
