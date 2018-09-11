/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderLineUpdateComponent } from 'app/entities/event-order-line/event-order-line-update.component';
import { EventOrderLineService } from 'app/entities/event-order-line/event-order-line.service';
import { EventOrderLine } from 'app/shared/model/event-order-line.model';

describe('Component Tests', () => {
    describe('EventOrderLine Management Update Component', () => {
        let comp: EventOrderLineUpdateComponent;
        let fixture: ComponentFixture<EventOrderLineUpdateComponent>;
        let service: EventOrderLineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderLineUpdateComponent]
            })
                .overrideTemplate(EventOrderLineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EventOrderLineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOrderLineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EventOrderLine(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eventOrderLine = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EventOrderLine();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eventOrderLine = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
