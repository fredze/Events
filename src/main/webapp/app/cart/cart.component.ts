import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from './cart.service';
import { Principal } from '../core/auth/principal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModalService } from 'app/core';

@Component({
    selector: 'jhi-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {
    products: CartItem[];

    constructor(
        private cartService: CartService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit() {
        this.refresh();
        this.principal.identity().then(); // Login
    }

    removeProduct(p: CartItem) {
        this.cartService.removeProduct(p);
        this.refresh();
    }

    payOrder() {
        this.cartService.addOrder().subscribe(res => {
            this.toastr.success(`Success: order number ${res.body.id} received!`);
            this.cartService.emptyCart();
            this.router.navigate(['/events']);
        });
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }

    login(): void {
        this.loginModalService.open();
    }

    private refresh(): void {
        this.products = Array.from(this.cartService.products.values());
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
