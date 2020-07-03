import { Publisher, OrderCreatedEvent, Subjects } from '@ttbntickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
