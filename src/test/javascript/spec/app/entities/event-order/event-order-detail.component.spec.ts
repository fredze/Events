/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderDetailComponent } from 'app/entities/event-order/event-order-detail.component';
import { EventOrder } from 'app/shared/model/event-order.model';

describe('Component Tests', () => {
    describe('EventOrder Management Detail Component', () => {
        let comp: EventOrderDetailComponent;
        let fixture: ComponentFixture<EventOrderDetailComponent>;
        const route = ({ data: of({ eventOrder: new EventOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EventOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EventOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.eventOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
