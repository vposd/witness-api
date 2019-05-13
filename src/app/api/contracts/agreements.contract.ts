import { IsNotEmpty } from 'class-validator';

export class AgreementContract {

  @IsNotEmpty()
  title: string;

  body: string;

  @IsNotEmpty()
  participants: string[];

  tags: string[];
}
