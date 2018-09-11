import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'app/cart.service';

@Component({
    selector: 'jhi-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {
    products: CartItem[];

    constructor(public cartService: CartService) {}

    ngOnInit() {
        this.refresh();
    }

    removeProduct(p: CartItem) {
        this.cartService.removeProduct(p);
        this.refresh();
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }

    private refresh(): void {
        this.products = Array.from(this.cartService.products.values());
    }
}
