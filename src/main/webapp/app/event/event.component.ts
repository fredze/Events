import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CartService } from 'app/cart.service';
import { EventService } from 'app/entities/event';
import { IEvent } from 'app/shared/model/event.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'jhi-events',
    templateUrl: './event.component.html',
    styles: []
})
export class EventComponent implements OnInit {
    public event: IEvent;

    constructor(private cartService: CartService, private route: ActivatedRoute, private eventService: EventService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId = +params.id;
            this.eventService
                .find(productId)
                .pipe(map((res: HttpResponse<IEvent>) => res.body))
                .subscribe((event: IEvent) => (this.event = event), (res: HttpErrorResponse) => console.error(res));
        });
    }

    addToCart(p: IEvent): void {
        this.cartService.addProduct(p);
    }
}
