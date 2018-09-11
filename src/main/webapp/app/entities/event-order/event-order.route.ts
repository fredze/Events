import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventOrder } from 'app/shared/model/event-order.model';
import { EventOrderService } from './event-order.service';
import { EventOrderComponent } from './event-order.component';
import { EventOrderDetailComponent } from './event-order-detail.component';
import { EventOrderUpdateComponent } from './event-order-update.component';
import { EventOrderDeletePopupComponent } from './event-order-delete-dialog.component';
import { IEventOrder } from 'app/shared/model/event-order.model';

@Injectable({ providedIn: 'root' })
export class EventOrderResolve implements Resolve<IEventOrder> {
    constructor(private service: EventOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((eventOrder: HttpResponse<EventOrder>) => eventOrder.body));
        }
        return of(new EventOrder());
    }
}

export const eventOrderRoute: Routes = [
    {
        path: 'event-order',
        component: EventOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order/:id/view',
        component: EventOrderDetailComponent,
        resolve: {
            eventOrder: EventOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order/new',
        component: EventOrderUpdateComponent,
        resolve: {
            eventOrder: EventOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order/:id/edit',
        component: EventOrderUpdateComponent,
        resolve: {
            eventOrder: EventOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventOrderPopupRoute: Routes = [
    {
        path: 'event-order/:id/delete',
        component: EventOrderDeletePopupComponent,
        resolve: {
            eventOrder: EventOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
