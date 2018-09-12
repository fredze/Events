import { Component } from '@angular/core';
import { Event } from '../../shared/model/event.model';
import { CartService } from '../../cart/cart.service';
import { Input } from '@angular/core';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html',
    styles: []
})
export class EventComponent {
    @Input() event: Event;

    constructor(private cartService: CartService) {}

    addToCart(): void {
        this.cartService.addProduct(this.event);
    }
}
