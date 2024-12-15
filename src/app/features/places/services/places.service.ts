import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Place, PlaceList } from '../models/place.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private readonly http: HttpClient) {}

  list(page: number): Observable<PlaceList> {
    return this.http
      .get<PlaceList>('/places', { params: { page: page } })
      .pipe(map((data: PlaceList) => data));
  }

  get(ID: number): Observable<Place> {
    return this.http.get<Place>(`/places/${ID}`);
  }

  filter(filter: string): Observable<PlaceList> {
    return this.http.get<PlaceList>(`/places/filter?${filter}`);
  }
}
