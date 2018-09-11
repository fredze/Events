import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { EVENTS_ROUTE } from 'app/events/events.route';
import { CART_ROUTE } from 'app/cart/cart.route';
import { SEARCH_EVENT_ROUTE } from 'app/search-event/search-event.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                EVENTS_ROUTE,
                CART_ROUTE,
                SEARCH_EVENT_ROUTE,
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#EventsEcommerceAdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class EventsEcommerceAppRoutingModule {}
