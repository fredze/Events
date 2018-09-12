import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faDolly, faMapMarked, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

import { VERSION } from 'app/app.constants';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { CartItem, CartService } from 'app/cart/cart.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    searchText = '';

    faDolly = faDolly;
    faSearch = faSearch;
    faCog = faCog;
    faMapMarked = faMapMarked;

    dateEventFrom = moment();
    dateEventTo = moment().add(2, 'y');

    byDateEventFrom = false;
    byDateEventTo = false;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private cartService: CartService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    getCartSize() {
        return this.cartService.getCartTotalSize();
    }

    emptyCart() {
        const b = window.confirm('Are you sure you want to empty your cart?');
        if (b) {
            this.cartService.emptyCart();
        }
    }

    get cart() {
        return this.cartService.getProductsArray();
    }

    removeCart(e: CartItem) {
        this.cartService.removeProduct(e);
    }

    cartTotalPrice(): number {
        return this.cartService.cartTotalPrice();
    }

    search(): void {
        const qp = {};

        if (this.byDateEventFrom) {
            qp['dateFrom'] = this.dateEventFrom.format('YYYY-MM-DD');
        }

        if (this.byDateEventTo) {
            qp['dateTo'] = this.dateEventTo.format('YYYY-MM-DD');
        }

        this.router.navigate(['/search-event', this.searchText], { queryParams: qp });
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }
}
