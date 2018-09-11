import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/entities/event';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Event } from 'app/shared/model/event.model';

@Component({
    selector: 'jhi-search-event',
    templateUrl: './search-event.component.html',
    styles: []
})
export class SearchEventComponent implements OnInit {
    events: Event[] = [];

    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(map => {
            this.searchEvents(map.get('name'));
        });
    }

    searchEvents(name: string): void {
        this.eventService.search(name).subscribe(evs => {
            this.events = evs.body;
        });
    }
}
