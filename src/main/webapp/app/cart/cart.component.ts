import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from './cart.service';
import { Principal } from '../core/auth/principal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModalService } from 'app/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'app/entities/category';
import { Category } from 'app/shared/model/category.model';
import { Event } from 'app/shared/model/event.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
    selector: 'jhi-cart',
    templateUrl: './cart.component.html',
    styles: []
})
export class CartComponent implements OnInit {
    products: CartItem[];
    categories: Map<number, Category>;
    payPalConfig?: PayPalConfig;

    faTimes = faTimes;

    constructor(
        private cartService: CartService,
        private categoryService: CategoryService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private toastr: ToastrService,
        private router: Router,
        private modalservice: NgbModal
    ) {
        this.categories = new Map<number, Category>();
    }

    ngOnInit() {
        this.refresh();
        this.principal.identity().then(); // Login
        this.initConfig(); // paypal
    }
    private initConfig(): void {
        this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
            commit: true,
            client: {
                sandbox: 'yourSandboxClientId'
            },
            button: {
                label: 'paypal'
            },
            onPaymentComplete: (data, actions) => {
                console.log('OnPaymentComplete');
            },
            onCancel: (data, actions) => {
                console.log('OnCancel');
            },
            onError: err => {
                console.log('OnError');
            },
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: 9
                    }
                }
            ]
        });
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

    getCategoryName(event: Event): string {
        return event.category.name;
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

    enterPaymentInfo(content) {
        this.modalservice.open(content, { size: 'lg' }).result.then();
    }
    generateMonth() {
        const tab = [];
        for (let i = 1; i <= 12; i++) {
            tab.push(i);
        }
        return tab;
    }
    generateDay() {
        const tab = [];
        for (let i = 1; i <= 31; i++) {
            tab.push(i);
        }
        return tab;
    }
    payOrderCC(modal) {
        this.cartService.addOrder().subscribe(res => {
            this.toastr.success(`Success: order number ${res.body.id} received!`);
            this.cartService.emptyCart();
            this.router.navigate(['/events']);
        });
        modal.close();
    }
}
