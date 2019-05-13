import Express from 'express';
import { classToPlain } from 'class-transformer';

import { Authorize, Controller, Get, BaseController } from '../../../infrastructure/framework';
import { ParticipantsService } from '../../../domain/services/participants.service';

@Controller()
export class ParticipantsController extends BaseController {

  constructor(
    private participantsService: ParticipantsService
  ) {
    super();
  }

  @Authorize
  @Get('/api/participant')
  async getParticipant(req: Express.Request, res: Express.Response) {
    const participant = await this.participantsService.getOrCreateUserParticipant(req.user.id);

    this.ok(res, classToPlain(participant));
  }

}
