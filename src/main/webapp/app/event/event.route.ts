import { Route } from '@angular/router';
import { EventComponent } from 'app/event/event.component';

export const EVENT_ROUTE: Route = {
    path: 'view-event/:id',
    component: EventComponent,
    data: {
        authorities: []
    }
};
