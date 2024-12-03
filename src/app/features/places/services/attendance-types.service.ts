import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceType } from '../models/attendance-type.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceTypesService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<AttendanceType>> {
    return this.http
      .get<Array<AttendanceType>>('/attendance-types')
      .pipe(map((data: Array<AttendanceType>) => data));
  }
}
