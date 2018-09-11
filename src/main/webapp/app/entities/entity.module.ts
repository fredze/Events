import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EventsEcommerceCategoryModule } from './category/category.module';
import { EventsEcommerceEventModule } from './event/event.module';
import { EventsEcommerceEventOrderLineModule } from './event-order-line/event-order-line.module';
import { EventsEcommerceEventOrderModule } from './event-order/event-order.module';
import { EventsEcommerceTransactionModule } from './transaction/transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EventsEcommerceCategoryModule,
        EventsEcommerceEventModule,
        EventsEcommerceEventOrderLineModule,
        EventsEcommerceEventOrderModule,
        EventsEcommerceTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsEcommerceEntityModule {}
