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
}
