import { Route } from '@angular/router';
import { SearchEventComponent } from 'app/search-event/search-event.component';

export const SEARCH_EVENT_ROUTE: Route = {
    path: 'search-event/:name',
    component: SearchEventComponent,
    data: {
        authorities: [],
        pageTitle: 'Search'
    }
};
