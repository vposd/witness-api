import { BaseRepository } from '../db/base-repository.class';
import { DbSource } from '../db/db-source.service';
import { Injectable } from '../../framework';
import { Repository } from '../../../infrastructure/framework/db/decorators';
import { Agreement } from '../../../domain/entities/agreement.entity';

@Repository({
  collectionName: 'agreements',
  entityType: Agreement
})

@Injectable()

export class AgreementsRepository extends BaseRepository<Agreement> {
  constructor(db: DbSource) {
    super(db);
  }
}
