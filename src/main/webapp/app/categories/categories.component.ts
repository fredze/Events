import { Component, OnInit } from '@angular/core';
import { Category } from 'app/shared/model/category.model';
import { CartService } from 'app/cart.service';
import { CategoryService } from 'app/entities/category';
import { EventService } from 'app/entities/event';
import { map, tap } from 'rxjs/operators';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Event } from 'app/shared/model/event.model';

@Component({
    selector: 'jhi-categories',
    templateUrl: './categories.component.html',
    styles: []
})
export class CategoriesComponent implements OnInit {
    categories: Map<number, Category>;
    events: Map<number, Event[]>;
    searchText = '';

    faCircle = faCircle;

    constructor(private cartService: CartService, private categoryService: CategoryService, private eventService: EventService) {
        this.categories = new Map<number, Category>();
        this.events = new Map<number, Event[]>();
        this.categoriesTest();
    }

    ngOnInit() {}

    categoriesTest(): void {
        const req = this.eventService.query().pipe(
            map(eventsReq => eventsReq.body),
            tap(events => {
                events.forEach(e => {
                    if (!this.categories.has(e.category.id)) {
                        this.categories.set(e.category.id, e.category);
                    }
                    if (!this.events.has(e.category.id)) {
                        this.events.set(e.category.id, []);
                    }
                    this.events.get(e.category.id).push(e);
                });
            })
        );
        req.subscribe();
    }

    addToCart(p: Event): void {
        this.cartService.addProduct(p);
    }

    get categoryArray() {
        return Array.from(this.categories.values());
    }

    eventsArray(n: number) {
        return this.events.get(n);
    }

    searchEvent() {
        this.eventService.search(this.searchText).subscribe(r => console.log(r));
    }
}
