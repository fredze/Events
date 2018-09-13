import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/entities/event';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'app/shared/model/event.model';
import * as moment from 'moment';
import { CartService } from '../cart/cart.service';
import { Utils } from 'app/shared/util/utils';

@Component({
    selector: 'jhi-search-event',
    templateUrl: './search-event.component.html',
    styles: []
})
export class SearchEventComponent implements OnInit {
    events: Event[] = [];
    eventsFiltered: Event[] = [];

    dateFrom: moment.Moment;
    dateTo: moment.Moment;

    min = 0;
    max = 100;

    range = {
        start: 20,
        end: 60
    };

    constructor(private cartService: CartService, private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(map => {
            this.route.queryParams.subscribe((params: any) => {
                if (params.hasOwnProperty('dateFrom')) {
                    this.dateFrom = moment(params.dateFrom);
                }

                if (params.hasOwnProperty('dateTo')) {
                    this.dateTo = moment(params.dateTo);
                }

                this.searchEvents(map.get('name'));
            });
        });
    }

    searchEvents(name: string): void {
        const opt = {
            name
        };

        if (this.dateFrom) {
            opt['dateFrom'] = Utils.convertMomentToDate(this.dateFrom);
        }

        if (this.dateTo) {
            opt['dateTo'] = Utils.convertMomentToDate(this.dateTo);
        }

        this.eventService.search(opt).subscribe(evs => {
            this.events = evs.body;
            this.eventsFiltered = this.events;
            this.calculateMinMax();
        });
    }

    calculateMinMax(): void {
        this.min = this.events.length > 0 ? this.events[0].price : 0;
        this.max = this.min;
        const ceil = 50;

        this.events.forEach(e => {
            const ep = Math.ceil(e.price / ceil) * ceil;

            if (this.max < ep) {
                this.max = ep;
            }

            if (this.min > e.price) {
                this.min = e.price;
            }
        });

        this.range = { start: this.min, end: this.max };
    }

    filter(): void {
        this.eventsFiltered = this.events.filter(e => e.price >= this.range.start && e.price <= this.range.end);
    }
}
