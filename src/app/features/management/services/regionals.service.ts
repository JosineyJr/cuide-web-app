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
}
