import { Component, Input, OnInit } from '@angular/core';
import { Event, StateEvent } from '../../shared/model/event.model';
import { CartService } from '../../cart/cart.service';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html',
    styleUrls: ['event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() event: Event;

    private number;
    private readonly threshold = 0.05;

    faDolly = faDolly;

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.number = this.cartService.isInCart(this.event) ? this.cartService.getCartEntry(this.event).number : 0;
    }

    addToCart(nb = 1): void {
        this.number += nb;
        this.cartService.addProduct(this.event, nb);
    }

    isInCart(): boolean {
        return this.cartService.isInCart(this.event);
    }

    get qte(): number {
        return this.cartService.getCartEntry(this.event).number;
    }

    isAvailable(): boolean {
        return this.event.availablePlaces > 0 && this.event.stateEvent === StateEvent.AVAILABLE;
    }

    showAvailablePlaces(): boolean {
        return this.event.availablePlaces < this.event.totalPlaces * this.threshold;
    }

    canAddPlaces(n = 1): boolean {
        return this.event.availablePlaces - this.number - n > 0;
    }
}
