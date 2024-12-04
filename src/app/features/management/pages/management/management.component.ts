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
import { Place } from '../../models/place.model';
import { AttendanceType } from '../../models/attendance-type.model';
import { ReferenceWay } from '../../models/reference-way.model';
import { Regional } from '../../models/regional.model';
import { Segment } from '../../models/segment.model';
import { ServiceType } from '../../models/service-type.model';

@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SingularizePipe,
    JoinPipe,
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

  constructor(
    private readonly attendanceTypesService: AttendanceTypesService,
    private readonly placesService: PlacesService,
    private readonly referenceWaysService: ReferenceWaysService,
    private readonly regionalsService: RegionalsService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService
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
            next: (places: Array<Place>) => {
              this.currentEntities = places.map(
                (p) =>
                  new Place(
                    p.id,
                    p.name,
                    p.address,
                    p.phone_number,
                    p.website,
                    p.observations,
                    p.google_maps_link,
                    p.service_type,
                    p.segment,
                    p.regionals,
                    p.reference_ways,
                    p.attendance_types
                  )
              );
            },
          });

        this.currentEntity = {
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
    console.log();

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
}
