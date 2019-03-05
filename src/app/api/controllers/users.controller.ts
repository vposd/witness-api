import { UsersService } from '../../../domain/services/users.service';
import { Injectable, Controller } from '../../../infrastructure/framework';

@Controller()
@Injectable()
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }
}
