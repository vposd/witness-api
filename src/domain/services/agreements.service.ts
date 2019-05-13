import { Injectable } from '../../infrastructure/framework';
import { AgreementsRepository } from '../../infrastructure/persistence/repositories/agreements.repository';
import { ParticipantsService } from './participants.service';
import { Agreement } from '../entities/agreement.entity';

@Injectable()
export class AgreementsService {

  constructor(
    private agreementsRepository: AgreementsRepository,
    private participantsService: ParticipantsService
  ) {}

  async createAgreement(authorUserId: string, title: string, body: string, participantsIds: string[], tags: string[]) {
    const author = await this.participantsService.getOrCreateUserParticipant(authorUserId);
    const participants = await this.participantsService.getManyById(participantsIds);

    const agreement = new Agreement(
      title,
      body,
      author,
      participants,
      tags
    );

    await agreement.validate();

    return this.agreementsRepository.save(agreement);
  }

  async getUserAgreements(userId: string) {
    // get agreements includes participants with userId
  }

}
