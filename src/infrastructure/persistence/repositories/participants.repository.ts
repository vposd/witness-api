import { Injectable } from '../../framework';
import { BaseRepository } from '../db/base-repository.class';
import { DbSource } from '../db/db-source.service';
import { Participant } from '../../../domain/entities/participant.entity';

@Injectable()
export class ParticipantsRepository extends BaseRepository<Participant> {

  storeName = 'participants';

  constructor(db: DbSource) {
    super(db);
  }
}