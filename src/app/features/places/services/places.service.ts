import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private readonly http: HttpClient) {}

  list(page: number): Observable<Array<Place>> {
    return this.http
      .get<Array<Place>>('/places', { params: { page: page } })
      .pipe(map((data: Array<Place>) => data));
  }

  get(ID: number): Observable<Place> {
    return this.http.get<Place>(`/places/${ID}`);
  }

  filter(filter: string): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(`/places/filter?${filter}`);
  }
}
