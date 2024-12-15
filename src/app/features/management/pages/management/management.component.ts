import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AttendanceTypesService } from '../../services/attendance-types.service';
import { PlacesService } from '../../services/places.service';
import { ReferenceWaysService } from '../../services/reference-ways.service';
import { RegionalsService } from '../../services/regionals.service';
import { SegmentsService } from '../../services/segments.service';
import { ServiceTypesService } from '../../services/service-types.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Entity } from '../../models/entity.model';
import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { SingularizePipe } from '../../pipes/singularize.pipe';
import { JoinPipe } from '../../../places/pipes/join.pipe';
import { Place, PlaceList } from '../../models/place.model';
import { AttendanceType } from '../../models/attendance-type.model';
import { ReferenceWay } from '../../models/reference-way.model';
import { Regional } from '../../models/regional.model';
import { Segment } from '../../models/segment.model';
import { ServiceType } from '../../models/service-type.model';
import { Router } from '@angular/router';
import { ShowMoreComponent } from '../../../../shared/components/show-more/show-more.component';

@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SingularizePipe,
    JoinPipe,
    ShowMoreComponent,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent implements OnInit {
  currentEntities: Array<
    Place | AttendanceType | ReferenceWay | Regional | Segment | ServiceType
  > = [];
  entities = [
    { name: 'places', label: 'Serviços' },
    { name: 'segments', label: 'Eixos' },
    { name: 'service-types', label: 'Tipos de serviço' },
    { name: 'regionals', label: 'Regionais' },
    { name: 'attendance-types', label: 'Tipos de atendimento' },
    { name: 'reference-ways', label: 'Formas de encaminhamento' },
  ];
  currentEntity!: Entity;

  destroyRef = inject(DestroyRef);

  hasMore = false;

  constructor(
    private readonly attendanceTypesService: AttendanceTypesService,
    private readonly placesService: PlacesService,
    private readonly referenceWaysService: ReferenceWaysService,
    private readonly regionalsService: RegionalsService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly routerService: Router
  ) {}

  ngOnInit(): void {
    this.setEntity('places');
  }

  setEntity(type: string) {
    switch (type) {
      case 'places':
        this.placesService
          .list(1)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (places: PlaceList) => {
              this.currentEntities = places.places.map(
                (p) =>
                  new Place(
                    p.id,
                    p.name,
                    p.address,
                    p.phone_number,
                    p.website,
                    p.observations,
                    p.google_maps_link,
                    p.google_maps_embed_link,
                    p.admission_criteria,
                    p.service_type,
                    p.segment,
                    p.regionals,
                    p.reference_ways,
                    p.attendance_types
                  )
              );
              this.hasMore = places.metadata.pages > 1;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[0].label,
          type: this.entities[0].name,
        };

        break;
      case 'segments':
        this.segmentsService
          .list()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (segments: Array<Segment>) => {
              this.currentEntities = segments;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[1].label,
          type: this.entities[1].name,
        };
        break;
      case 'service-types':
        this.serviceTypesService
          .list()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (segments: Array<Segment>) => {
              this.currentEntities = segments;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[2].label,
          type: this.entities[2].name,
        };
        break;
      case 'regionals':
        this.regionalsService
          .list()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (regionals: Array<Regional>) => {
              this.currentEntities = regionals;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[3].label,
          type: this.entities[3].name,
        };
        break;
      case 'attendance-types':
        this.attendanceTypesService
          .list()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (attendanceTypes: Array<AttendanceType>) => {
              this.currentEntities = attendanceTypes;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[4].label,
          type: this.entities[4].name,
        };
        break;
      case 'reference-ways':
        this.referenceWaysService
          .list()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (attendanceTypes: Array<AttendanceType>) => {
              this.currentEntities = attendanceTypes;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[5].label,
          type: this.entities[5].name,
        };
        break;
    }
  }

  isInstanceOfPlace(
    entity:
      | Place
      | AttendanceType
      | ReferenceWay
      | Regional
      | Segment
      | ServiceType
  ): boolean {
    return entity instanceof Place;
  }

  getPlace(
    entity:
      | Place
      | AttendanceType
      | ReferenceWay
      | Regional
      | Segment
      | ServiceType
  ): Place {
    return entity as Place;
  }

  addEntity(type?: string) {
    switch (type) {
      case 'places':
        this.routerService.navigate(['place']);
        break;
      case 'attendance-types':
        this.routerService.navigate(['attendance-type']);
        break;
      case 'reference-ways':
        this.routerService.navigate(['reference-way']);
        break;
      case 'regionals':
        this.routerService.navigate(['regional']);
        break;
      case 'segments':
        this.routerService.navigate(['segment']);
        break;
      case 'service-types':
        this.routerService.navigate(['service-type']);
        break;
      default:
        break;
    }
  }

  deleteEntity(entity: Entity, type?: string) {
    switch (type) {
      case 'places':
        console.log('did not implement yet');
        break;
      case 'attendance-types':
        this.attendanceTypesService
          .delete({
            id: entity.id,
            name: entity.name,
          })
          .subscribe({
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);
            },
          });
        break;
      case 'reference-ways':
        this.referenceWaysService
          .delete({
            id: entity.id,
            name: entity.name,
          })
          .subscribe({
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);
            },
          });
        break;
      case 'regionals':
        this.regionalsService
          .delete({
            id: entity.id,
            name: entity.name,
          })
          .subscribe({
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);
            },
          });
        break;
      case 'segments':
        this.segmentsService
          .delete({
            id: entity.id,
            name: entity.name,
          })
          .subscribe({
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);
            },
          });
        break;
      case 'service-types':
        this.serviceTypesService
          .delete({
            id: entity.id,
            name: entity.name,
          })
          .subscribe({
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);
            },
          });
        break;
      default:
        break;
    }
  }

  navigateTo(route: string) {
    this.routerService.navigate([route]);
  }

  onPlacesLoaded(newPlaces: PlaceList) {
    this.currentEntities = [...this.currentEntities, ...newPlaces.places];
    this.hasMore =
      this.currentEntities.length < newPlaces.metadata.total_places;
  }
}
