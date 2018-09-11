import { IEvent } from 'app/shared/model//event.model';
import { IEventOrder } from 'app/shared/model//event-order.model';

export interface IEventOrderLine {
    id?: number;
    quantity?: number;
    price?: number;
    event?: IEvent;
    eventOrder?: IEventOrder;
}

export class EventOrderLine implements IEventOrderLine {
    constructor(
        public id?: number,
        public quantity?: number,
        public price?: number,
        public event?: IEvent,
        public eventOrder?: IEventOrder
    ) {}
}
