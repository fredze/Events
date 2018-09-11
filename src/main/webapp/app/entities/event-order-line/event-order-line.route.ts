import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventOrderLine } from 'app/shared/model/event-order-line.model';
import { EventOrderLineService } from './event-order-line.service';
import { EventOrderLineComponent } from './event-order-line.component';
import { EventOrderLineDetailComponent } from './event-order-line-detail.component';
import { EventOrderLineUpdateComponent } from './event-order-line-update.component';
import { EventOrderLineDeletePopupComponent } from './event-order-line-delete-dialog.component';
import { IEventOrderLine } from 'app/shared/model/event-order-line.model';

@Injectable({ providedIn: 'root' })
export class EventOrderLineResolve implements Resolve<IEventOrderLine> {
    constructor(private service: EventOrderLineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((eventOrderLine: HttpResponse<EventOrderLine>) => eventOrderLine.body));
        }
        return of(new EventOrderLine());
    }
}

export const eventOrderLineRoute: Routes = [
    {
        path: 'event-order-line',
        component: EventOrderLineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order-line/:id/view',
        component: EventOrderLineDetailComponent,
        resolve: {
            eventOrderLine: EventOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order-line/new',
        component: EventOrderLineUpdateComponent,
        resolve: {
            eventOrderLine: EventOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrderLines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'event-order-line/:id/edit',
        component: EventOrderLineUpdateComponent,
        resolve: {
            eventOrderLine: EventOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrderLines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventOrderLinePopupRoute: Routes = [
    {
        path: 'event-order-line/:id/delete',
        component: EventOrderLineDeletePopupComponent,
        resolve: {
            eventOrderLine: EventOrderLineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EventOrderLines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
