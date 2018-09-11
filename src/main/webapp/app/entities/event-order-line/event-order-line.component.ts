import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEventOrderLine } from 'app/shared/model/event-order-line.model';
import { Principal } from 'app/core';
import { EventOrderLineService } from './event-order-line.service';

@Component({
    selector: 'jhi-event-order-line',
    templateUrl: './event-order-line.component.html'
})
export class EventOrderLineComponent implements OnInit, OnDestroy {
    eventOrderLines: IEventOrderLine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private eventOrderLineService: EventOrderLineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.eventOrderLineService.query().subscribe(
            (res: HttpResponse<IEventOrderLine[]>) => {
                this.eventOrderLines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEventOrderLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEventOrderLine) {
        return item.id;
    }

    registerChangeInEventOrderLines() {
        this.eventSubscriber = this.eventManager.subscribe('eventOrderLineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
