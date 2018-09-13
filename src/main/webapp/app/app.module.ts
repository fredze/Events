import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { EventsEcommerceSharedModule } from 'app/shared';
import { EventsEcommerceCoreModule } from 'app/core';
import { EventsEcommerceAppRoutingModule } from './app-routing.module';
import { EventsEcommerceHomeModule } from './home/home.module';
import { EventsEcommerceAccountModule } from './account/account.module';
import { EventsEcommerceEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { EventsComponent } from 'app/events/events.component';
import { CartComponent } from 'app/cart/cart.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { ViewEventComponent } from 'app/view-event/view-event.component';
import { EventComponent } from 'app/layouts/event/event.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

@NgModule({
    imports: [
        BrowserModule,
        EventsEcommerceAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        EventsEcommerceSharedModule,
        EventsEcommerceCoreModule,
        EventsEcommerceHomeModule,
        EventsEcommerceAccountModule,
        EventsEcommerceEntityModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        EventsComponent,
        ViewEventComponent,
        EventComponent,
        CartComponent,
        SearchEventComponent,
        ViewCategoryComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class EventsEcommerceAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
