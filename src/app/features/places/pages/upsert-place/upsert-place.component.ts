import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionalsService } from '../../services/regionals.service';
import { Regional } from '../../models/regional.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AttendanceTypesService } from '../../services/attendance-types.service';
import { AttendanceType } from '../../models/attendance-type.model';
import { SegmentsService } from '../../services/segments.service';
import { Segment } from '../../models/segment.model';
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from 'ng-multiselect-dropdown';
import { ServiceType } from '../../models/service-type.model';
import { ServiceTypesService } from '../../services/service-types.service';
import { ReferenceWaysService } from '../../services/reference-ways.service';
import { ReferenceWay } from '../../models/reference-way.model';

@Component({
  selector: 'app-upsert-place',
  imports: [
    FormsModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './upsert-place.component.html',
  styleUrl: './upsert-place.component.css',
})
export class UpsertPlaceComponent implements OnInit {
  regionals: Array<Regional> = [];
  selectedRegionals: Array<Regional> = [];
  settingsRegionals: IDropdownSettings = {};

  attendanceTypes: Array<AttendanceType> = [];
  selectedAttendanceTypes: Array<AttendanceType> = [];
  settingsAttendanceTypes: IDropdownSettings = {};

  segments: Array<Segment> = [];
  selectedSegments: Array<Segment> = [];
  settingsSegments: IDropdownSettings = {};

  serviceTypes: Array<ServiceType> = [];
  selectedServiceTypes: Array<ServiceType> = [];
  settingsServiceTypes: IDropdownSettings = {};

  referenceWays: Array<ReferenceWay> = [];
  selectedReferenceWays: Array<ReferenceWay> = [];
  settingsReferenceWays: IDropdownSettings = {};

  destroyRef = inject(DestroyRef);

  constructor(
    private readonly regionalsService: RegionalsService,
    private readonly attendanceTypesService: AttendanceTypesService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly referenceWaysService: ReferenceWaysService
  ) {}

  ngOnInit() {
    this.regionalsService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (regionals: Array<Regional>) => {
          this.regionals = regionals;
        },
      });

    this.attendanceTypesService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (attendanceTypes: Array<AttendanceType>) => {
          this.attendanceTypes = attendanceTypes;
        },
      });

    this.segmentsService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (segments: Array<Segment>) => {
          this.segments = segments;
        },
      });

    this.serviceTypesService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (serviceTypes: Array<Segment>) => {
          this.serviceTypes = serviceTypes;
        },
      });

    this.referenceWaysService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (referenceWays: Array<ReferenceWay>) => {
          this.referenceWays = referenceWays;
        },
      });

    this.settingsRegionals = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
      noFilteredDataAvailablePlaceholderText: 'Regional não encontrada',
    };

    this.settingsAttendanceTypes = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
      noFilteredDataAvailablePlaceholderText:
        'Tipo de atendimento não encontrado',
    };

    this.settingsSegments = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      singleSelection: true,
      searchPlaceholderText: 'Buscar',
      allowSearchFilter: true,
      noFilteredDataAvailablePlaceholderText: 'Eixo não encontrado',
    };

    this.settingsServiceTypes = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      singleSelection: true,
      searchPlaceholderText: 'Buscar',
      allowSearchFilter: true,
      noFilteredDataAvailablePlaceholderText: 'Tipo de serviço não encontrado',
    };

    this.settingsReferenceWays = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
      noFilteredDataAvailablePlaceholderText:
        'Forma de encaminhamento não encontrado',
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedRegionals);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedRegionals);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
