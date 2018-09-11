/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderLineComponent } from 'app/entities/event-order-line/event-order-line.component';
import { EventOrderLineService } from 'app/entities/event-order-line/event-order-line.service';
import { EventOrderLine } from 'app/shared/model/event-order-line.model';

describe('Component Tests', () => {
    describe('EventOrderLine Management Component', () => {
        let comp: EventOrderLineComponent;
        let fixture: ComponentFixture<EventOrderLineComponent>;
        let service: EventOrderLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderLineComponent],
                providers: []
            })
                .overrideTemplate(EventOrderLineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EventOrderLineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOrderLineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EventOrderLine(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.eventOrderLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
