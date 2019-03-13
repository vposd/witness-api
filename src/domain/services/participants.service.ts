import { Injectable } from '../../infrastructure/framework';
import { Participant } from '../entities/participant.entity';
import { ParticipantsRepository } from '../../infrastructure/persistence/repositories/participants.repository';

@Injectable()
export class ParticipantsService {

  constructor(
    private patricipantsRepository: ParticipantsRepository
  ) { }

  async getOrCreateUserParticipant(userId: string) {
    const participant = await this.patricipantsRepository.findOne({ userId });

    if (participant) {
      return participant;
    }

    const newParticipant = new Participant(userId);
    await newParticipant.validate();

    return this.patricipantsRepository.save(newParticipant);
  }

  get(id: string) {
    return this.patricipantsRepository.findById(id);
  }
}
