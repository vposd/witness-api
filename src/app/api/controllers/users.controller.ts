import Express from 'express';
import { UsersService } from '../../../domain/services/users.service';
import { Controller, Get, Post } from '../../../infrastructure/framework';
import { User } from '../../../domain/entities/user.entity';
import { validate } from '../../../infrastructure/helpers/validator';

@Controller()
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @Get('/api/users/:id')
  async getUser(req: Express.Request, res: Express.Response) {
    try {
      const user = await this.usersService.get(req.params.id);
      res
        .status(200)
        .json(user);
    } catch (error) {
      res
        .status(500)
        .json(error);
    }
  }

  @Post('/api/users')
  async addUser(req: Express.Request, res: Express.Response) {
    try {
      const user = new User(
        req.body.name,
        req.body.photoUrl,
        req.body.email
      );
      await validate(user);

      await this.usersService.add(user);
      res
        .status(201)
        .send();
    } catch (error) {
      res
        .status(500)
        .json({error: error.toString()});
    }
  }
}
