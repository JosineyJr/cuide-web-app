import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Place } from '../models/place.model';

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
}
