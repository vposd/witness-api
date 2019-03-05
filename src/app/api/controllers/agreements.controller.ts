import Express from 'express';
import { AgreementsService } from '../../../domain/services/agreements.service';
import { Get, Post, Controller, Injectable } from '../../../infrastructure/framework';

@Controller()
@Injectable()
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
