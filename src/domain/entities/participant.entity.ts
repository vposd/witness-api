import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { Entity } from '../entity';

export class Participant extends Entity {

  @IsNotEmpty()
  userId: string;

  @Type(() => Set)
  attachedAgreements: Set<string>;

  @Type(() => Set)
  approvedAgreements: Set<string>;

  constructor(
    userId: string
  ) {
    super();
    this.userId = userId;
    this.attachedAgreements = new Set();
    this.approvedAgreements = new Set();
  }

  attachAgreement(agreementId: string) {
    this.attachedAgreements.add(agreementId);
  }

  approveAgreement(agreementId: string) {
    this.attachAgreement(agreementId);
    this.approvedAgreements.add(agreementId);
  }
}
