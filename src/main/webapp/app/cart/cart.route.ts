import { CartComponent } from 'app/cart/cart.component';
import { Route } from '@angular/router';

export const CART_ROUTE: Route = {
    path: 'cart',
    component: CartComponent,
    data: {
        authorities: [],
        pageTitle: 'Your cart'
    }
};
