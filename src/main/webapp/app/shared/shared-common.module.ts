import { NgModule } from '@angular/core';

import { EventsEcommerceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EventsEcommerceSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EventsEcommerceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EventsEcommerceSharedCommonModule {}
