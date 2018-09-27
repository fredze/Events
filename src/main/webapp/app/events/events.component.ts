import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CategoryService, ICategoryWE } from 'app/entities/category';

@Component({
    selector: 'jhi-events',
    templateUrl: './events.component.html',
    styles: []
})
export class EventsComponent implements OnInit {
    categories: ICategoryWE[];

    constructor(private cartService: CartService, private categoryService: CategoryService) {
        this.fetchCategories();
    }

    ngOnInit() {}

    fetchCategories(): void {
        this.categoryService.listRecent(3).subscribe(icwe => (this.categories = icwe.body));
    }
}
