/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EventsEcommerceTestModule } from '../../../test.module';
import { EventOrderDeleteDialogComponent } from 'app/entities/event-order/event-order-delete-dialog.component';
import { EventOrderService } from 'app/entities/event-order/event-order.service';

describe('Component Tests', () => {
    describe('EventOrder Management Delete Component', () => {
        let comp: EventOrderDeleteDialogComponent;
        let fixture: ComponentFixture<EventOrderDeleteDialogComponent>;
        let service: EventOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EventsEcommerceTestModule],
                declarations: [EventOrderDeleteDialogComponent]
            })
                .overrideTemplate(EventOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EventOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
