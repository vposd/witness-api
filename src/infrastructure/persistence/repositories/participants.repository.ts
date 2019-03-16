import { Injectable } from '../../framework';
import { BaseRepository } from '../db/base-repository.class';
import { DbSource } from '../db/db-source.service';
import { Participant } from '../../../domain/entities/participant.entity';
import { Repository } from '../../../infrastructure/framework/db/decorators';

@Repository({
  collectionName: 'participants',
  entityType: Participant
})
@Injectable()
export class ParticipantsRepository extends BaseRepository<Participant> {
  constructor(db: DbSource) {
    super(db);
  }
}
