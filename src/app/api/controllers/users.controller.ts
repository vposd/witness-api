import { UsersService } from '../../../domain/services/users.service';
import { Controller } from '../../../infrastructure/framework';

@Controller()
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }
}
