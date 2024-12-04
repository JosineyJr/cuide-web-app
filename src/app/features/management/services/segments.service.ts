import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Segment } from '../models/segment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SegmentsService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<Segment>> {
    return this.http
      .get<Array<Segment>>('/segments')
      .pipe(map((data: Array<Segment>) => data));
  }
}
