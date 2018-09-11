import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEventOrderLine } from 'app/shared/model/event-order-line.model';

type EntityResponseType = HttpResponse<IEventOrderLine>;
type EntityArrayResponseType = HttpResponse<IEventOrderLine[]>;

@Injectable({ providedIn: 'root' })
export class EventOrderLineService {
    private resourceUrl = SERVER_API_URL + 'api/event-order-lines';

    constructor(private http: HttpClient) {}

    create(eventOrderLine: IEventOrderLine): Observable<EntityResponseType> {
        return this.http.post<IEventOrderLine>(this.resourceUrl, eventOrderLine, { observe: 'response' });
    }

    update(eventOrderLine: IEventOrderLine): Observable<EntityResponseType> {
        return this.http.put<IEventOrderLine>(this.resourceUrl, eventOrderLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEventOrderLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEventOrderLine[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
