import { Injectable } from '@angular/core';
import { Event, StateEvent } from '../shared/model/event.model';
import { EventOrderService } from 'app/entities/event-order';
import { ToastrService } from 'ngx-toastr';

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

    static isAvailable(event: Event): boolean {
        return event.availablePlaces > 0 && event.stateEvent === StateEvent.AVAILABLE;
    }

    constructor(private eventOrderService: EventOrderService, private toastr: ToastrService) {
        this.products = new Map();
    }

    /**
     * Add a product to the cart. It it already exists in the cart, increment
     * the number by the number given.
     * @param product the product to add
     * @param nb the number to add
     */
    addProduct(product: Event, nb = 1): void {
        if (this.products.has(product.id)) {
            // If the product exists, increment its number
            this.products.get(product.id).number += nb;
            this.toastr.success(`Added more tickets for ${product.name} to cart!`);
        } else {
            // If not, add it
            this.products.set(product.id, new CartItem(product, nb));
            this.toastr.success(`Added ${nb} tickets for ${product.name} to cart!`);
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
     * Returns the size of the cart, as distinct events.
     */
    getCartProductsSize(): number {
        return this.products.size;
    }

    /**
     * Gets the total size of the cart (counting multiple unique entries)
     */
    getCartTotalSize(): number {
        return this.getProductsArray().reduce((acc, e) => acc + e.number, 0);
    }

    /**
     * Gets an array of products from the map
     */
    getProductsArray(): CartItem[] {
        return Array.from(this.products.values());
    }

    /**
     * Returns wether or not the event given is in cart.
     * @param event the event to check
     */
    isInCart(event: Event): boolean {
        return this.products.has(event.id);
    }

    /**
     * Returns the CartItem associated with the event.
     * @param event
     */
    getCartEntry(event: Event): CartItem {
        return this.products.get(event.id);
    }

    /**
     * Removes all the products in the cart.
     */
    emptyCart(): void {
        this.products.clear();
    }

    /**
     * Calculates the total price of the cart
     */
    cartTotalPrice(): number {
        return Array.from(this.products.values()).reduce((acc, cv) => acc + cv.number * cv.item.price, 0);
    }

    /**
     * Pays the order
     */
    addOrder() {
        return this.eventOrderService.payOrder(this.products);
    }
}
