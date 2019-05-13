import { IsUrl, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { classToPlain } from 'class-transformer';

import { validate } from '../../infrastructure/helpers/validator';

export class User {

  id: string;

  @IsNotEmpty()
  displayName: string;

  @ValidateIf(e => e.photoUrl)
  @IsUrl()
  photoUrl: string;

  @ValidateIf(e => e.email)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  googleProfileId: string;

  constructor(
    googleProfileId: string,
    displayName: string,
    photoUrl: string,
    email: string
  ) {
    this.googleProfileId = googleProfileId;
    this.displayName = displayName;
    this.photoUrl = photoUrl;
    this.email = email;
  }

  validate() {
    return validate(this);
  }

  toDto() {
    return classToPlain(this);
  }
}
