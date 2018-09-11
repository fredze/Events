import { Moment } from 'moment';
import { ICategory } from 'app/shared/model//category.model';

export const enum StateEvent {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE'
}

export interface IEvent {
    id?: number;
    name?: string;
    price?: number;
    responsable?: string;
    totalPlaces?: number;
    availablePlaces?: number;
    dateEvent?: Moment;
    placeEvent?: string;
    description?: string;
    stateEvent?: StateEvent;
    pricipalPicture?: string;
    category?: ICategory;
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public responsable?: string,
        public totalPlaces?: number,
        public availablePlaces?: number,
        public dateEvent?: Moment,
        public placeEvent?: string,
        public description?: string,
        public stateEvent?: StateEvent,
        public pricipalPicture?: string,
        public category?: ICategory
    ) {}
}
