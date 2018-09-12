import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from './cart.service';
import { Principal } from '../core/auth/principal.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {
    products: CartItem[];

    constructor(private cartService: CartService, private principal: Principal, private router: Router) {}

    ngOnInit() {
        this.refresh();
    }

    removeProduct(p: CartItem) {
        this.cartService.removeProduct(p);
        this.refresh();
    }

    payOrder() {
        this.cartService.addOrder().subscribe(res => {
            this.router.navigate(['/events']);
        });
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }

    private refresh(): void {
        this.products = Array.from(this.cartService.products.values());
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
