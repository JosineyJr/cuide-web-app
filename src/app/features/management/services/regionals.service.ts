import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regional } from '../models/regional.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionalsService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<Regional>> {
    return this.http
      .get<Array<Regional>>('/regionals')
      .pipe(map((data: Array<Regional>) => data));
  }

  get(ID: number): Observable<Regional> {
    return this.http.get<Regional>(`/regionals/${ID}`);
  }

  create(regional: Regional): Observable<void> {
    return this.http.post<void>(`/regionals`, {
      name: regional.name,
    });
  }

  update(regional: Regional): Observable<void> {
    return this.http.put<void>(`/regionals/${regional.id}`, {
      name: regional.name,
    });
  }

  delete(regional: Regional): Observable<void> {
    return this.http.delete<void>(`/regionals/${regional.id}`);
  }
}
