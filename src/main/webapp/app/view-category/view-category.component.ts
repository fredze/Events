import { Component, Input, OnInit } from '@angular/core';
import { Category, ICategory } from 'app/shared/model/category.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Event, IEvent } from 'app/shared/model/event.model';
import { CategoryService } from 'app/entities/category';
import { EventService } from 'app/entities/event';

@Component({
    selector: 'jhi-view-category',
    templateUrl: './view-category.component.html',
    styles: []
})
export class ViewCategoryComponent implements OnInit {
    categoryId: number;
    category: Category;

    events: Event[] = [];

    private readonly size = 10;
    private page = 0;

    constructor(private route: ActivatedRoute, private categoryService: CategoryService, private eventService: EventService) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.categoryId = parseInt(params.get('id'), 10);
            this.categoryService
                .find(this.categoryId)
                .pipe(map((res: HttpResponse<IEvent>) => res.body))
                .subscribe(
                    (cat: ICategory) => {
                        this.category = cat;
                        this.eventService.byCategory(this.category.id).subscribe(events => (this.events = events.body));
                    },
                    (res: HttpErrorResponse) => console.error(res)
                );
        });
    }
}
