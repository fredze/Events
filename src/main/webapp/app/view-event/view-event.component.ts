import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { EventService } from 'app/entities/event';
import { IEvent, StateEvent } from 'app/shared/model/event.model';
import { map } from 'rxjs/operators';
import { CartService } from 'app/cart/cart.service';
import { faCalendar, faDollarSign, faMapMarker } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
    public event: IEvent;
    public faCalendar = faCalendar;
    public faMapMarker = faMapMarker;
    public faDollarSign = faDollarSign;

    constructor(
        private cartService: CartService,
        private route: ActivatedRoute,
        private eventService: EventService,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId = +params.id;
            this.eventService
                .find(productId)
                .pipe(map((res: HttpResponse<IEvent>) => res.body))
                .subscribe((event: IEvent) => (this.event = event), (res: HttpErrorResponse) => console.error(res));
        });
    }

    addToCart(quantity = 1): void {
        this.cartService.addProduct(this.event, quantity);
    }

    isAvailable(): boolean {
        return this.event.availablePlaces > 0 && this.event.stateEvent === StateEvent.AVAILABLE;
    }

    isInCart(): boolean {
        return this.cartService.isInCart(this.event);
    }

    goBack(): void {
        this.location.back();
    }
}
