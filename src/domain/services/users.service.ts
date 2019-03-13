import { Injectable } from '../../infrastructure/framework';
import { Participant } from '../entities/participant.entity';
import { ParticipantsRepository } from '../../infrastructure/persistence/repositories/participants.repository';

@Injectable()
export class ParticipantsService {

  constructor(
    private patricipantsRepository: ParticipantsRepository
  ) { }

  add(participant: Participant) {
    return this.patricipantsRepository.save(participant);
  }

  get(id: string) {
    return this.patricipantsRepository.findById(id);
  }
}
