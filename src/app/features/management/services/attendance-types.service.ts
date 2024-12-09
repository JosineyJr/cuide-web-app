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

  get(ID: number): Observable<AttendanceType> {
    return this.http.get<AttendanceType>(`/attendance-types/${ID}`);
  }

  create(attendanceType: AttendanceType): Observable<void> {
    return this.http.post<void>(`/attendance-types`, {
      name: attendanceType.name,
    });
  }

  update(attendanceType: AttendanceType): Observable<void> {
    return this.http.put<void>(`/attendance-types/${attendanceType.id}`, {
      name: attendanceType.name,
    });
  }
}
