import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'app/shared/model/event.model';
import { CartService } from 'app/cart/cart.service';
import { faDolly, faCalendar, faMapMarker, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html',
    styleUrls: ['event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() event: Event;

    private number;
    maxAdd;
    private readonly threshold = 0.05;

    faDolly = faDolly;
    faCalendar = faCalendar;
    faMapMarker = faMapMarker;
    faDollarSign = faDollarSign;

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.number = this.cartService.isInCart(this.event) ? this.cartService.getCartEntry(this.event).number : 0;
        this.refresh();
    }

    addToCart(nb = 1): void {
        this.number += nb;
        this.cartService.addProduct(this.event, nb);
        this.refresh();
    }

    isInCart(): boolean {
        return this.cartService.isInCart(this.event);
    }

    get qte(): number {
        return this.cartService.getCartEntry(this.event).number;
    }

    isAvailable(): boolean {
        return CartService.isAvailable(this.event);
    }

    showAvailablePlaces(): boolean {
        return this.event.availablePlaces < this.event.totalPlaces * this.threshold;
    }

    refresh() {
        this.maxAdd = this.event.availablePlaces - this.number;
    }
}
