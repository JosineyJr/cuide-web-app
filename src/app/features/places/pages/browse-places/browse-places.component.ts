import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { SegmentsService } from '../../services/segments.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Segment } from '../../models/segment.model';
import { CommonModule } from '@angular/common';
import { ServiceTypesService } from '../../services/service-types.service';
import { ServiceType } from '../../models/service-type.model';
import { RegionalsService } from '../../services/regionals.service';
import { Regional } from '../../models/regional.model';
import { AttendanceTypesService } from '../../services/attendance-types.service';
import { AttendanceType } from '../../models/attendance-type.model';
import { ReferenceWaysService } from '../../services/reference-ways.service';
import { AdmissionCriteriaService } from '../../services/admission-criteria.service';
import { ReferenceWay } from '../../models/reference-way.model';
import { AdmissionCriteria } from '../../models/admission-criteria.model';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { JoinPipe } from '../../pipes/join.pipe';

@Component({
  selector: 'app-browse-places',
  imports: [HeaderComponent, FooterComponent, CommonModule, JoinPipe],
  templateUrl: './browse-places.component.html',
  styleUrl: './browse-places.component.css',
})
export class BrowsePlacesComponent implements OnInit {
  filters: Array<{
    name: string;
    label: string;
    values: Array<{ id: number; name: string }>;
  }> = [
    { name: 'SEGMENTS', label: 'Categoria', values: [] },
    { name: 'SERVICE_TYPES', label: 'Tipo de serviço', values: [] },
    { name: 'REGIONALS', label: 'Regional', values: [] },
    { name: 'ATTENDANCE_TYPES', label: 'Tipo de atendimento', values: [] },
    { name: 'REFERENCE_WAYS', label: 'Forma de encaminhamento', values: [] },
  ];

  dropdownStates: Map<string, boolean> = new Map();
  checkboxStates: Map<string, boolean> = new Map();

  places: Array<Place> = [];

  destroyRef = inject(DestroyRef);

  constructor(
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly regionalsService: RegionalsService,
    private readonly attendanceTypesService: AttendanceTypesService,
    private readonly referenceWaysService: ReferenceWaysService,
    private readonly placesService: PlacesService
  ) {}

  ngOnInit() {
    this.segmentsService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (segments: Array<Segment>) => {
          this.filters[0].values = segments;

          for (let index = 0; index < segments.length; index++) {
            this.checkboxStates.set(this.filters[0].name + index, false);
          }
        },
      });

    this.serviceTypesService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (serviceTypes: Array<ServiceType>) => {
          this.filters[1].values = serviceTypes;

          for (let index = 0; index < serviceTypes.length; index++) {
            this.checkboxStates.set(this.filters[1].name + index, false);
          }
        },
      });

    this.regionalsService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (regionals: Array<Regional>) => {
          this.filters[2].values = regionals;

          for (let index = 0; index < regionals.length; index++) {
            this.checkboxStates.set(this.filters[2].name + index, false);
          }
        },
      });

    this.attendanceTypesService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (attendanceTypes: Array<AttendanceType>) => {
          this.filters[3].values = attendanceTypes;

          for (let index = 0; index < attendanceTypes.length; index++) {
            this.checkboxStates.set(this.filters[3].name + index, false);
          }
        },
      });

    this.referenceWaysService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (referenceWays: Array<ReferenceWay>) => {
          this.filters[4].values = referenceWays;

          for (let index = 0; index < referenceWays.length; index++) {
            this.checkboxStates.set(this.filters[4].name + index, false);
          }
        },
      });

    this.placesService
      .list(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (places: Array<Place>) => {
          this.places = places;
        },
      });
  }

  toggleDropdown(dropdownKey: string) {
    this.dropdownStates.set(dropdownKey, !this.dropdownStates.get(dropdownKey));
  }

  toggleCheckbox(checkboxKey: string, event: Event) {
    event.stopPropagation();

    this.checkboxStates.set(checkboxKey, !this.checkboxStates.get(checkboxKey));
  }
}
