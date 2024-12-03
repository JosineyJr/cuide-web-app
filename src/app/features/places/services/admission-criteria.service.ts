import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmissionCriteria } from '../models/admission-criteria.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionCriteriaService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<AdmissionCriteria>> {
    return this.http
      .get<Array<AdmissionCriteria>>('/admission-criteria')
      .pipe(map((data: Array<AdmissionCriteria>) => data));
  }
}
