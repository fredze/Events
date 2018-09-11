import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEventOrder } from 'app/shared/model/event-order.model';

type EntityResponseType = HttpResponse<IEventOrder>;
type EntityArrayResponseType = HttpResponse<IEventOrder[]>;

@Injectable({ providedIn: 'root' })
export class EventOrderService {
    private resourceUrl = SERVER_API_URL + 'api/event-orders';

    constructor(private http: HttpClient) {}

    create(eventOrder: IEventOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(eventOrder);
        return this.http
            .post<IEventOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(eventOrder: IEventOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(eventOrder);
        return this.http
            .put<IEventOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEventOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEventOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(eventOrder: IEventOrder): IEventOrder {
        const copy: IEventOrder = Object.assign({}, eventOrder, {
            createAt: eventOrder.createAt != null && eventOrder.createAt.isValid() ? eventOrder.createAt.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createAt = res.body.createAt != null ? moment(res.body.createAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((eventOrder: IEventOrder) => {
            eventOrder.createAt = eventOrder.createAt != null ? moment(eventOrder.createAt) : null;
        });
        return res;
    }
}
