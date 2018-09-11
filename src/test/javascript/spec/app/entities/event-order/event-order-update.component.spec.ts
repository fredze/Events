/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderUpdateComponent } from 'app/entities/event-order/event-order-update.component';
import { EventOrderService } from 'app/entities/event-order/event-order.service';
import { EventOrder } from 'app/shared/model/event-order.model';

describe('Component Tests', () => {
    describe('EventOrder Management Update Component', () => {
        let comp: EventOrderUpdateComponent;
        let fixture: ComponentFixture<EventOrderUpdateComponent>;
        let service: EventOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderUpdateComponent]
            })
                .overrideTemplate(EventOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EventOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EventOrder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eventOrder = entity;
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
                    const entity = new EventOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.eventOrder = entity;
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
