import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/entities/event';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Event } from 'app/shared/model/event.model';
import * as moment from 'moment';

@Component({
    selector: 'jhi-search-event',
    templateUrl: './search-event.component.html',
    styles: []
})
export class SearchEventComponent implements OnInit {
    events: Event[] = [];
    dateFrom: moment.Moment;
    dateTo: moment.Moment;

    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(map => {
            console.log(map.get('dateFrom'));
            console.log(map.get('dateTo'));
            this.dateFrom = moment(map.get('dateFrom'));
            this.dateTo = moment(map.get('dateTo'));
            console.log(this.dateFrom);
            console.log(this.dateTo);
            this.searchEvents(map.get('name'));
        });
    }

    searchEvents(name: string): void {
        if (this.dateFrom && this.dateTo) {
            this.eventService.searchDate(name, this.dateFrom.format('YYYY-MM-DD'), this.dateTo.format('YYYY-MM-DD')).subscribe(evs => {
                console.log(evs);
                this.events = evs.body;
            });
        } else {
            this.eventService.search(name).subscribe(evs => {
                this.events = evs.body;
            });
        }
    }
}
