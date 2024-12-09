import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferenceWay } from '../models/reference-way.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferenceWaysService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<ReferenceWay>> {
    return this.http
      .get<Array<ReferenceWay>>('/reference-ways')
      .pipe(map((data: Array<ReferenceWay>) => data));
  }

  get(ID: number): Observable<ReferenceWay> {
    return this.http.get<ReferenceWay>(`/reference-ways/${ID}`);
  }

  create(referenceWay: ReferenceWay): Observable<void> {
    return this.http.post<void>(`/reference-ways`, {
      name: referenceWay.name,
    });
  }

  update(referenceWay: ReferenceWay): Observable<void> {
    return this.http.put<void>(`/reference-ways/${referenceWay.id}`, {
      name: referenceWay.name,
    });
  }
}
