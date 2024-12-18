import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place, PlaceList } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private readonly http: HttpClient) {}

  list(page: number): Observable<PlaceList> {
    return this.http.get<PlaceList>('/places', { params: { page: page } });
  }

  create(place: Record<string, any>): Observable<void> {
    return this.http.post<void>('/places', place);
  }

  update(placeID: number, place: Record<string, any>): Observable<void> {
    return this.http.put<void>(`/places/${placeID}`, place);
  }

  get(ID: number): Observable<Place> {
    return this.http.get<Place>(`/places/${ID}`);
  }

  delete(ID: number): Observable<void> {
    return this.http.delete<void>(`/places/${ID}`);
  }
}
