import { Component, OnInit } from '@angular/core';
import { Category, ICategory } from 'app/shared/model/category.model';
import { ActivatedRoute, Router } from '@angular/router';
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

    readonly size = 8;
    totalSize;
    page;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private eventService: EventService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.categoryId = parseInt(params.get('id'), 10);

            this.route.queryParams.subscribe(qp => {
                if (qp.hasOwnProperty('p')) {
                    this.page = parseInt(qp.p, 10);
                } else {
                    this.page = 1;
                }

                this.categoryService
                    .find(this.categoryId)
                    .pipe(map((res: HttpResponse<IEvent>) => res.body))
                    .subscribe(
                        (cat: ICategory) => {
                            this.category = cat;
                            this.eventService.countByCategory(this.category.id).subscribe(e => (this.totalSize = e));
                            this.eventService
                                .byCategory(this.category.id, this.page - 1, this.size)
                                .subscribe(events => (this.events = events.body));
                        },
                        (res: HttpErrorResponse) => console.error(res)
                    );
            });
        });
    }

    changePage(payload) {
        if (Number.isInteger(payload)) {
            console.log(payload, 'an integer');
            this.router.navigate(['view-category', this.categoryId], { queryParams: { p: `${payload}` } });
        } else {
            console.error(payload, 'not an integer');
        }
    }
}
