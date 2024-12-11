import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Place, PlaceList } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private readonly http: HttpClient) {}

  list(page: number): Observable<PlaceList> {
    return this.http.get<PlaceList>('/places', { params: { page: page } });
  }
}
