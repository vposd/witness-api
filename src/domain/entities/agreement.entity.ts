import { Entity } from '../entity';
import { Participant } from './participant.entity';

export class Agreement extends Entity {

  get tags() {
    return Array.from(this._tags);
  }

  createdAt: Date;
  isCompleted: boolean;
  participants: Participant[];

  private _tags: Set<string>;

  constructor(
    public title: string,
    public body: string,
    public author: Participant,
    participants: Participant[] = [],
    tags: string[] = [],
  ) {
    super();
    this.createdAt = new Date();
    this.isCompleted = false;
    this.updateTags(tags);
    this.updateParticipants(participants);
  }

  addTag(tag: string) {
    this._tags.add(tag);
  }

  removeTag(tag: string) {
    this._tags.delete(tag);
  }

  complete() {
    this.isCompleted = true;
  }

  addParticipant(participant: Participant) {
    const isParticipantExist = this.participants
      .some(p => p.id === participant.id);

    if (isParticipantExist) {
      return;
    }

    participant.attachAgreement(this.id);
    this.participants.push(participant);
  }

  private updateParticipants(participants: Participant[]) {
    this.author.attachAgreement(this.id);
    this.author.approveAgreement(this.id);

    participants
      .forEach(p => this.addParticipant(p));
  }

  private updateTags(tags: string[]) {
    tags.forEach(t => this.addTag(t));
  }
}