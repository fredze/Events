import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsEcommerceSharedModule } from 'app/shared';
import {
    EventOrderComponent,
    EventOrderDetailComponent,
    EventOrderUpdateComponent,
    EventOrderDeletePopupComponent,
    EventOrderDeleteDialogComponent,
    eventOrderRoute,
    eventOrderPopupRoute
} from './';

const ENTITY_STATES = [...eventOrderRoute, ...eventOrderPopupRoute];

@NgModule({
    imports: [EventsEcommerceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EventOrderComponent,
        EventOrderDetailComponent,
        EventOrderUpdateComponent,
        EventOrderDeleteDialogComponent,
        EventOrderDeletePopupComponent
    ],
    entryComponents: [EventOrderComponent, EventOrderUpdateComponent, EventOrderDeleteDialogComponent, EventOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEcommerceEventOrderModule {}
