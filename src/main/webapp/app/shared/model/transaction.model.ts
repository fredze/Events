import { Moment } from 'moment';
import { IEventOrder } from 'app/shared/model//event-order.model';

export interface ITransaction {
    id?: number;
    price?: number;
    dateTransaction?: Moment;
    payment?: string;
    eventOrder?: IEventOrder;
}

export class Transaction implements ITransaction {
    constructor(
        public id?: number,
        public price?: number,
        public dateTransaction?: Moment,
        public payment?: string,
        public eventOrder?: IEventOrder
    ) {}
}
