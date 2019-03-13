import { IsNotEmpty } from 'class-validator';

import { Entity } from '../entity';

export class Participant extends Entity {

  @IsNotEmpty()
  userId: string;

  get attachedAgreements() {
    return Array.from(this._attachedAgreements);
  }

  get approvedAgreements() {
    return Array.from(this._approvedAgreements);
  }

  private _attachedAgreements: Set<string>;
  private _approvedAgreements: Set<string>;

  constructor(
    userId: string
  ) {
    super();
    this.userId = userId;
    this._attachedAgreements = new Set();
    this._approvedAgreements = new Set();
  }

  attachAgreement(agreementId: string) {
    this._attachedAgreements.add(agreementId);
  }

  approveAgreement(agreementId: string) {
    this.attachAgreement(agreementId);
    this._approvedAgreements.add(agreementId);
  }
}
