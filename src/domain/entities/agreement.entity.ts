import { Entity } from '../entity';
import { User } from './user.entity';

export class Agreement extends Entity {

  createdAt: Date;
  isCompleted: boolean;
  participants: User[];
  tags: Set<string>;

  constructor(
    public title: string,
    public body: string,
    public author: User,
    participants: User[] = [],
    tags: string[] = [],
  ) {
    super();
    this.createdAt = new Date();
    this.isCompleted = false;
    this.updateTags(tags);
    this.updateParticipants(participants);
  }

  addTag(tag: string) {
    this.tags.add(tag);
  }

  removeTag(tag: string) {
    this.tags.delete(tag);
  }

  complete() {
    this.isCompleted = true;
  }

  addParticipant(participant: User) {
    const isParticipantExist = this.participants
      .some(p => p.id === participant.id);

    if (isParticipantExist) {
      return;
    }

    participant.attachAgreement(this.id);
    this.participants.push(participant);
  }

  private updateParticipants(participants: User[]) {
    this.author.attachAgreement(this.id);
    this.author.approveAgreement(this.id);

    participants
      .forEach(p => this.addParticipant(p));
  }

  private updateTags(tags: string[]) {
    tags.forEach(t => this.addTag(t));
  }
}