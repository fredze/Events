import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventOrder } from 'app/shared/model/event-order.model';

@Component({
    selector: 'jhi-event-order-detail',
    templateUrl: './event-order-detail.component.html'
})
export class EventOrderDetailComponent implements OnInit {
    eventOrder: IEventOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eventOrder }) => {
            this.eventOrder = eventOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
