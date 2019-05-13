import Express from 'express';

import { AgreementsService } from '../../../domain/services/agreements.service';
import { Controller, Post, Authorize, BaseController } from '../../../infrastructure/framework';
import { AgreementContract } from '../contracts/agreements.contract';
import { validate } from '../../../infrastructure/helpers/validator';

@Controller()
export class AgreementsController extends BaseController {

  constructor(
    private agreementsService: AgreementsService
  ) {
    super();
  }

  @Authorize
  @Post('/api/agreements')
  async createAgreement(req: Express.Request, res: Express.Response) {

    const agreementContract: AgreementContract = req.body;
    await validate(agreementContract);

    await this.agreementsService.createAgreement(
      req.user.id,
      agreementContract.title,
      agreementContract.body,
      agreementContract.participants,
      agreementContract.tags
    );

    this.created(res);
  }

}
