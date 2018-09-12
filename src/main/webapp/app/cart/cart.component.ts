import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from './cart.service';

@Component({
    selector: 'jhi-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {
    products: CartItem[];

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.refresh();
    }

    removeProduct(p: CartItem) {
        this.cartService.removeProduct(p);
        this.refresh();
    }

    payOrder() {
        this.cartService.addOrder();
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }

    private refresh(): void {
        this.products = Array.from(this.cartService.products.values());
    }
}
