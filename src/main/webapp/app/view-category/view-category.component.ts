import { Component, Input, OnInit } from '@angular/core';
import { Category, ICategory } from 'app/shared/model/category.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Event, IEvent } from 'app/shared/model/event.model';
import { CategoryService } from 'app/entities/category';

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

    constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.categoryId = parseInt(params.get('id'), 10);
            this.categoryService
                .find(this.categoryId)
                .pipe(map((res: HttpResponse<IEvent>) => res.body))
                .subscribe((cat: ICategory) => (this.category = cat), (res: HttpErrorResponse) => console.error(res));
        });
    }
}
