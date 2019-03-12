import { Length, IsUrl, IsEmail, IsNotEmpty } from 'class-validator';
import { Entity } from '../entity';

export class User extends Entity {

  @Length(4, 50)
  @IsNotEmpty()
  username: string;

  @Length(4, 50)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  photoUrl: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  attachedAgreements: Set<string>;
  approvedAgreements: Set<string>;

  constructor(
    name: string,
    username: string,
    photoUrl: string,
    email: string
  ) {
    super();
    this.name = name;
    this.username = username;
    this.photoUrl = photoUrl;
    this.email = email;
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
