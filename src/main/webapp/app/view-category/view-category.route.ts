import { Route } from '@angular/router';
import { ViewCategoryComponent } from 'app/view-category/view-category.component';

export const VIEW_CATEGORY_ROUTE: Route = {
    path: 'view-category/:id',
    component: ViewCategoryComponent,
    data: {
        authorities: []
    }
};
