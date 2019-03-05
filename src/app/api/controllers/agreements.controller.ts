import Express from 'express';
import { AgreementsService } from '../../../domain/services/agreements.service';
import { Get, Post, Controller } from '../../../infrastructure/framework';

@Controller()
export class AgreementsController {

  constructor(
    private agreementsService: AgreementsService
  ) { }

  @Get('/api/get')
  get(req: Express.Request, res: Express.Response) {
    res
      .status(200)
      .send({ hello: true });
  }

  @Post('/api/post')
  post(req: Express.Request, res: Express.Response) {
    res
      .status(200)
      .send(req.body);
  }


}
