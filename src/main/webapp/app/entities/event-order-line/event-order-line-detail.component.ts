import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventOrderLine } from 'app/shared/model/event-order-line.model';

@Component({
    selector: 'jhi-event-order-line-detail',
    templateUrl: './event-order-line-detail.component.html'
})
export class EventOrderLineDetailComponent implements OnInit {
    eventOrderLine: IEventOrderLine;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eventOrderLine }) => {
            this.eventOrderLine = eventOrderLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
