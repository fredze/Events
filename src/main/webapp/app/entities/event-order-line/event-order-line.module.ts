import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventsEcommerceSharedModule } from 'app/shared';
import {
    EventOrderLineComponent,
    EventOrderLineDetailComponent,
    EventOrderLineUpdateComponent,
    EventOrderLineDeletePopupComponent,
    EventOrderLineDeleteDialogComponent,
    eventOrderLineRoute,
    eventOrderLinePopupRoute
} from './';

const ENTITY_STATES = [...eventOrderLineRoute, ...eventOrderLinePopupRoute];

@NgModule({
    imports: [EventsEcommerceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EventOrderLineComponent,
        EventOrderLineDetailComponent,
        EventOrderLineUpdateComponent,
        EventOrderLineDeleteDialogComponent,
        EventOrderLineDeletePopupComponent
    ],
    entryComponents: [
        EventOrderLineComponent,
        EventOrderLineUpdateComponent,
        EventOrderLineDeleteDialogComponent,
        EventOrderLineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEcommerceEventOrderLineModule {}
