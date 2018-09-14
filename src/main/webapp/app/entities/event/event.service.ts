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

    byCategory(id: number, page = 0, size = 10): Observable<EntityArrayResponseType> {
        const params = {
            page,
            size,
            cat: id
        };
        return this.sendReqTo(params, `${this.resourceUrl}-category`);
    }

    countByCategory(id: number): Observable<Number> {
        const params = createRequestOption({ id });
        return this.http.get<Number>(`${this.resourceUrl}-category-count`, { params });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    search(opt: any): Observable<EntityArrayResponseType> {
        return this.sendReqTo(opt, `${this.resourceUrl}-search`);
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

    private sendReqTo(opt: any, path: string): Observable<EntityArrayResponseType> {
        const options = createRequestOption(opt);
        return this.http
            .get<IEvent[]>(path, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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
