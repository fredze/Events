import { Moment } from 'moment';

export const enum StateEventOrder {
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    INPROGRESS = 'INPROGRESS',
    WAITING = 'WAITING'
}

export interface IEventOrder {
    id?: number;
    totalPrice?: number;
    createAt?: Moment;
    stateEventOrder?: StateEventOrder;
}

export class EventOrder implements IEventOrder {
    constructor(public id?: number, public totalPrice?: number, public createAt?: Moment, public stateEventOrder?: StateEventOrder) {}
}
