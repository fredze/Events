import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false
        }),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        FontAwesomeModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        }),
        MomentModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        ToastrModule,
        MomentModule
    ]
})
export class EventsEcommerceSharedLibsModule {}
