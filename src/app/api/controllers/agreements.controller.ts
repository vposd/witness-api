import Express from 'express';

import { AgreementsService } from '../../../domain/services/agreements.service';
import { Controller, Post } from '../../../infrastructure/framework';

@Controller()
export class AgreementsController {

  constructor(
    private agreementsService: AgreementsService
  ) { }

  @Post('/api/agreements')
  post(req: Express.Request, res: Express.Response) {
    res
      .status(200)
      .send(req.body);
  }


}
