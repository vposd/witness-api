import { GenericRepository } from '../generic-repository';
import { Agreement } from '../../../domain/entities/agreement.entity';
import { Injectable } from 'src/infrastructure/framework';

@Injectable()
export class AgreementsRepository extends GenericRepository<Agreement> { }
