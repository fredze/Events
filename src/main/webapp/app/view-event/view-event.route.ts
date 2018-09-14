import { Route } from '@angular/router';
import { ViewEventComponent } from 'app/view-event/view-event.component';

export const VIEW_EVENT_ROUTE: Route = {
    path: 'view-event/:id',
    component: ViewEventComponent,
    data: {
        authorities: []
    }
};
