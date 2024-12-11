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

  get(ID: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`/service-types/${ID}`);
  }

  create(serviceType: ServiceType): Observable<void> {
    return this.http.post<void>(`/service-types`, {
      name: serviceType.name,
    });
  }

  update(serviceType: ServiceType): Observable<void> {
    return this.http.put<void>(`/service-types/${serviceType.id}`, {
      name: serviceType.name,
    });
  }

  delete(serviceType: ServiceType): Observable<void> {
    return this.http.delete<void>(`/service-types/${serviceType.id}`);
  }
}
