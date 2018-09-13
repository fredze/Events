import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'app/entities/event';
import { IEvent, StateEvent } from 'app/shared/model/event.model';
import { map } from 'rxjs/operators';
import { CartService } from 'app/cart/cart.service';

@Component({
    selector: 'jhi-view-event',
    templateUrl: './view-event.component.html',
    styles: []
})
export class ViewEventComponent implements OnInit {
    public event: IEvent;
    public faArrowLeft = faArrowLeft;

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
