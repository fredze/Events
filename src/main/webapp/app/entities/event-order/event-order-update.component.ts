import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEventOrder } from 'app/shared/model/event-order.model';
import { EventOrderService } from './event-order.service';

@Component({
    selector: 'jhi-event-order-update',
    templateUrl: './event-order-update.component.html'
})
export class EventOrderUpdateComponent implements OnInit {
    private _eventOrder: IEventOrder;
    isSaving: boolean;
    createAtDp: any;

    constructor(private eventOrderService: EventOrderService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eventOrder }) => {
            this.eventOrder = eventOrder;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eventOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.eventOrderService.update(this.eventOrder));
        } else {
            this.subscribeToSaveResponse(this.eventOrderService.create(this.eventOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEventOrder>>) {
        result.subscribe((res: HttpResponse<IEventOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get eventOrder() {
        return this._eventOrder;
    }

    set eventOrder(eventOrder: IEventOrder) {
        this._eventOrder = eventOrder;
    }
}
