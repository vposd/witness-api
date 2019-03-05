import { Entity } from '../entity';

export class User extends Entity {

  attachedAgreements: Set<string>;
  approvedAgreements: Set<string>;

  constructor(
    public name: string,
    public photoUrl: string,
    public email: string
  ) {
    super();
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
