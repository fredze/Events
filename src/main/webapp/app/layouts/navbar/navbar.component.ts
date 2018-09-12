import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from 'app/app.constants';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { CartItem, CartService } from '../../cart/cart.service';
import { faDolly, faMapMarked, faSearch } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'app/entities/event';

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
    faMapMarked = faMapMarked;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private cartService: CartService,
        private eventService: EventService
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
        return this.cartService.getCartSize();
    }

    emptyCart() {
        const b = window.confirm('Are you sure you want to empty your cart?');
        if (b) {
            this.cartService.emptyCart();
        }
    }

    get cart() {
        return Array.from(this.cartService.products.values());
    }

    removeCart(event, e: CartItem) {
        this.cartService.removeProduct(e);
        event.stopPropagation();
    }

    cartTotalPrice(): number {
        return this.cartService.cartTotalPrice();
    }

    search(): void {
        // this.eventService.search(this.searchText).subscribe(r => console.log(r));
        this.router.navigate(['/search-event', this.searchText]);
    }
}
