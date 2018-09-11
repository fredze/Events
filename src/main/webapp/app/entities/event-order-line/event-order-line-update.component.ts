import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEventOrderLine } from 'app/shared/model/event-order-line.model';
import { EventOrderLineService } from './event-order-line.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';
import { IEventOrder } from 'app/shared/model/event-order.model';
import { EventOrderService } from 'app/entities/event-order';

@Component({
    selector: 'jhi-event-order-line-update',
    templateUrl: './event-order-line-update.component.html'
})
export class EventOrderLineUpdateComponent implements OnInit {
    private _eventOrderLine: IEventOrderLine;
    isSaving: boolean;

    events: IEvent[];

    eventorders: IEventOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventOrderLineService: EventOrderLineService,
        private eventService: EventService,
        private eventOrderService: EventOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eventOrderLine }) => {
            this.eventOrderLine = eventOrderLine;
        });
        this.eventService.query().subscribe(
            (res: HttpResponse<IEvent[]>) => {
                this.events = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.eventOrderService.query().subscribe(
            (res: HttpResponse<IEventOrder[]>) => {
                this.eventorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eventOrderLine.id !== undefined) {
            this.subscribeToSaveResponse(this.eventOrderLineService.update(this.eventOrderLine));
        } else {
            this.subscribeToSaveResponse(this.eventOrderLineService.create(this.eventOrderLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEventOrderLine>>) {
        result.subscribe((res: HttpResponse<IEventOrderLine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }

    trackEventOrderById(index: number, item: IEventOrder) {
        return item.id;
    }
    get eventOrderLine() {
        return this._eventOrderLine;
    }

    set eventOrderLine(eventOrderLine: IEventOrderLine) {
        this._eventOrderLine = eventOrderLine;
    }
}
