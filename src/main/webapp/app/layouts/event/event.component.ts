import { Component, Input } from '@angular/core';
import { Event, StateEvent } from '../../shared/model/event.model';
import { CartService } from '../../cart/cart.service';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html',
    styles: []
})
export class EventComponent {
    @Input() event: Event;

    faDolly = faDolly;

    constructor(private cartService: CartService) {}

    addToCart(nb = 1): void {
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
}
