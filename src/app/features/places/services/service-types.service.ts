import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceType } from '../models/service-type.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypesService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Array<ServiceType>> {
    return this.http
      .get<Array<ServiceType>>('/service-types')
      .pipe(map((data: Array<ServiceType>) => data));
  }
}
