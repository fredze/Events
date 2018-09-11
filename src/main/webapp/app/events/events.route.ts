import { Route } from '@angular/router';
import { EventsComponent } from 'app/events/events.component';

export const EVENTS_ROUTE: Route = {
    path: 'events',
    component: EventsComponent,
    data: {
        authorities: [],
        pageTitle: 'Events'
    }
};
