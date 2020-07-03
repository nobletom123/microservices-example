import { Subjects, Publisher, ExpirationCompleteEvent } from '@ttbntickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
