import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Segment } from '../../models/segment.model';
import { Regional } from '../../models/regional.model';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { ServiceType } from '../../models/service-type.model';
import { RegionalsService } from '../../../places/services/regionals.service';
import { SegmentsService } from '../../../places/services/segments.service';
import { ServiceTypesService } from '../../../places/services/service-types.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { PlacesService } from '../../services/places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  imports: [
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent implements OnInit {
  regionals: Array<Regional> = [];
  settingsRegionals: IDropdownSettings = {};

  settingsAttendanceTypes: IDropdownSettings = {};

  segments: Array<Segment> = [];
  settingsSegments: IDropdownSettings = {};

  serviceTypes: Array<ServiceType> = [];
  settingsServiceTypes: IDropdownSettings = {};

  settingsReferenceWays: IDropdownSettings = {};

  destroyRef = inject(DestroyRef);

  placesFormControl: FormGroup;

  constructor(
    private readonly regionalsService: RegionalsService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly placesService: PlacesService,
    private readonly routerService: Router
  ) {
    this.placesFormControl = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      website: new FormControl('', []),
      googleMapsLink: new FormControl('', [Validators.required]),
      googleMapsEmbedLink: new FormControl('', [Validators.required]),
      admissionCriteria: new FormControl('', [Validators.required]),
      observations: new FormControl('', []),
      segment: new FormControl('', [Validators.required]),
      serviceTypes: new FormControl('', [Validators.required]),
      regionals: new FormControl('', [Validators.required]),
      attendanceTypes: new FormControl('', [Validators.required]),
      referenceWays: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.regionalsService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (regionals: Array<Regional>) => {
          this.regionals = regionals;
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

    this.settingsRegionals = {
      selectAllText: 'Todas',
      unSelectAllText: 'Anular seleções',
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
      noFilteredDataAvailablePlaceholderText: 'Regional não encontrada',
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
      closeDropDownOnSelection: true,
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
      closeDropDownOnSelection: true,
    };
  }

  submit() {
    const place = {
      name: this.placesFormControl.get('name')?.value,
      address: this.placesFormControl.get('address')?.value,
      phone_number: this.placesFormControl.get('phoneNumber')?.value,
      website: this.placesFormControl.get('website')?.value,
      observations: this.placesFormControl.get('observations')?.value,
      google_maps_link: this.placesFormControl.get('googleMapsLink')?.value,
      google_maps_embed_link: this.placesFormControl.get('googleMapsEmbedLink')
        ?.value,
      admission_criteria:
        this.placesFormControl.get('admissionCriteria')?.value,
      service_type_id: this.placesFormControl.get('serviceTypes')?.value[0].id,
      segment_id: this.placesFormControl.get('segment')?.value[0].id,
      regional_ids: this.placesFormControl
        .get('regionals')
        ?.value.map((r: { id: number }) => r.id),
      reference_ways: this.placesFormControl.get('referenceWays')?.value,
      attendance_types: this.placesFormControl.get('attendanceTypes')?.value,
    };

    this.placesService.create(place).subscribe({
      next: () => {
        alert('Serviço cadastrado com sucesso');
        this.routerService.navigate(['/']);
      },
      error: () => {
        alert('Erro ao cadastrar serviço');
      },
    });
  }
}
