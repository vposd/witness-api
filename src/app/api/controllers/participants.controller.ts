import Express from 'express';

import { Controller, Authorize, Get } from '../../../infrastructure/framework';
import { ParticipantsService } from '../../../domain/services/participants.service';

@Controller()
export class ParticipantsController {

  constructor(
    private participantsService: ParticipantsService
  ) { }

  @Authorize
  @Get('/api/participant')
  async getParticipant(req: Express.Request, res: Express.Response) {
    const participant = await this.participantsService.getOrCreateUserParticipant(req.user.id);

    res
      .status(200)
      .json(participant);
  }

}