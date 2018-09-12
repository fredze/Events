import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/entities/event';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    dateFrom: moment.Moment;
    dateTo: moment.Moment;

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
            console.log(evs);
            this.events = evs.body;
        });
    }

    addToCart(p: Event): void {
        this.cartService.addProduct(p);
    }
}
