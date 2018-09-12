import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEvent } from 'app/shared/model/event.model';

type EntityResponseType = HttpResponse<IEvent>;
type EntityArrayResponseType = HttpResponse<IEvent[]>;

@Injectable({ providedIn: 'root' })
export class EventService {
    private resourceUrl = SERVER_API_URL + 'api/events';

    constructor(private http: HttpClient) {}

    create(event: IEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(event);
        return this.http
            .post<IEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(event: IEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(event);
        return this.http
            .put<IEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    search(text: string): Observable<EntityArrayResponseType> {
        const options = createRequestOption({
            name: text,
            size: 10,
            page: 0
        });
        return this.http
            .get<IEvent[]>('api/events-by-name', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    searchDate(text: string, dateFrom, dateTo): Observable<EntityArrayResponseType> {
        const options = createRequestOption({
            name: text,
            dateFrom: dateFrom,
            dateTo: dateTo,
            size: 10,
            page: 0
        });
        return this.http
            .get<IEvent[]>('api/events-by-name-date', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(event: IEvent): IEvent {
        const copy: IEvent = Object.assign({}, event, {
            dateEvent: event.dateEvent != null && event.dateEvent.isValid() ? event.dateEvent.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateEvent = res.body.dateEvent != null ? moment(res.body.dateEvent) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((event: IEvent) => {
            event.dateEvent = event.dateEvent != null ? moment(event.dateEvent) : null;
        });
        return res;
    }
}
