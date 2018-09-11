/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderLineDetailComponent } from 'app/entities/event-order-line/event-order-line-detail.component';
import { EventOrderLine } from 'app/shared/model/event-order-line.model';

describe('Component Tests', () => {
    describe('EventOrderLine Management Detail Component', () => {
        let comp: EventOrderLineDetailComponent;
        let fixture: ComponentFixture<EventOrderLineDetailComponent>;
        const route = ({ data: of({ eventOrderLine: new EventOrderLine(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderLineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EventOrderLineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EventOrderLineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.eventOrderLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
