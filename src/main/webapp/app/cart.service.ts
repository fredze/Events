import { Injectable } from '@angular/core';
import { Event } from 'app/shared/model/event.model';

/**
 * An item with the product and the number of times it is in the cart.
 */
export class CartItem {
    item: Event;
    number: number;

    constructor(item: Event, number = 1) {
        this.item = item;
        this.number = number;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    products: Map<number, CartItem>; // key: product id, value: CartItem

    constructor() {
        this.products = new Map();
    }

    /**
     * Add a product to the cart. It it already exists in the cart, increment
     * the number.
     * @param product the product to add
     */
    addProduct(product: Event): void {
        if (this.products.has(product.id)) {
            // If the product exists, increment its number
            this.products.get(product.id).number++;
        } else {
            // If not, add it
            this.products.set(product.id, new CartItem(product));
        }
    }

    /**
     * Removes the product from the cart, if it exists.
     * @param product the product to remove
     */
    removeProduct(product: CartItem): boolean {
        return this.products.delete(product.item.id);
    }

    /**
     * Returns the size of the cart.
     */
    getCartSize(): number {
        return this.products.size;
    }

    /**
     * Removes all the products in the cart.
     */
    emptyCart(): void {
        this.products.clear();
    }

    cartTotalPrice(): number {
        return Array.from(this.products.values()).reduce((acc, cv) => acc + cv.number * cv.item.price, 0);
    }
}
