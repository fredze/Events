import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEventOrderLine } from 'app/shared/model/event-order-line.model';
import { EventOrderLineService } from './event-order-line.service';

@Component({
    selector: 'jhi-event-order-line-delete-dialog',
    templateUrl: './event-order-line-delete-dialog.component.html'
})
export class EventOrderLineDeleteDialogComponent {
    eventOrderLine: IEventOrderLine;

    constructor(
        private eventOrderLineService: EventOrderLineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventOrderLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'eventOrderLineListModification',
                content: 'Deleted an eventOrderLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-event-order-line-delete-popup',
    template: ''
})
export class EventOrderLineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eventOrderLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EventOrderLineDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.eventOrderLine = eventOrderLine;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
