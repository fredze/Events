import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faDolly, faMapMarked, faSearch, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

import { VERSION } from 'app/app.constants';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { CartItem, CartService } from 'app/cart/cart.service';
import { Utils } from 'app/shared/util/utils';
import { CategoryService } from 'app/entities/category';
import { Category } from 'app/shared/model/category.model';

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
    faTimes = faTimes;

    sDateEventFrom = moment();
    sDateEventTo = moment().add(2, 'y');
    sCategory = 0;

    byDateEventFrom = false;
    byDateEventTo = false;
    byCategory = false;

    categoriesArray: Category[];
    categories: Map<number, Category>;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private categoryService: CategoryService,
        private router: Router,
        private cartService: CartService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.categories = new Map<number, Category>();
    }

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.categoryService.query().subscribe(res => {
            this.categoriesArray = res.body;
            res.body.forEach(c => this.categories.set(c.id, c));
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
            qp['dateFrom'] = Utils.convertMomentToDate(this.sDateEventFrom);
        }

        if (this.byDateEventTo) {
            qp['dateTo'] = Utils.convertMomentToDate(this.sDateEventTo);
        }

        this.router.navigate(['/search-event', this.searchText], { queryParams: qp });
    }

    get total() {
        return this.cartService.cartTotalPrice();
    }
}
