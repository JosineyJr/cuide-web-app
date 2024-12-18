import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../models/place.model';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-places',
  imports: [
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
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

  placeID: number | null;

  loading = false;

  private renderer: Renderer2;

  constructor(
    private readonly regionalsService: RegionalsService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly placesService: PlacesService,
    private readonly routerService: Router,
    private readonly rendererFactory: RendererFactory2,
    private readonly route: ActivatedRoute
  ) {
    this.placeID = null;
    this.renderer = rendererFactory.createRenderer(null, null);

    this.placesFormControl = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', []),
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
    this.loading = true;
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

    const placeID = this.route.snapshot.paramMap.get('id');

    if (placeID) {
      this.placeID = parseInt(placeID);
      this.placesService.get(this.placeID).subscribe({
        next: (place: Place) => {
          this.placesFormControl.get('name')?.setValue(place.name);
          this.placesFormControl.get('address')?.setValue(place.address);
          this.placesFormControl
            .get('phoneNumber')
            ?.setValue(place.phone_number);
          this.placesFormControl.get('website')?.setValue(place.website);
          this.placesFormControl
            .get('observations')
            ?.setValue(place.observations);
          this.placesFormControl
            .get('googleMapsLink')
            ?.setValue(place.google_maps_link);
          this.placesFormControl
            .get('googleMapsEmbedLink')
            ?.setValue(place.google_maps_embed_link);
          this.placesFormControl
            .get('referenceWays')
            ?.setValue(place.reference_ways);
          this.placesFormControl
            .get('attendanceTypes')
            ?.setValue(place.attendance_types);
          this.placesFormControl
            .get('admissionCriteria')
            ?.setValue(place.admission_criteria);
          this.placesFormControl
            .get('serviceTypes')
            ?.setValue([place.service_type]);
          this.placesFormControl.get('segment')?.setValue([place.segment]);
          this.placesFormControl.get('regionals')?.setValue(place.regionals);
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          console.log('error', err);
          alert('Erro ao carregar serviço');
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }

    const styles = document.querySelectorAll('head style');

    styles.forEach((styleElement) => {
      this.renderer.removeChild(document.head, styleElement);
    });
  }

  submit() {
    this.loading = true;

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

    if (!this.placeID) {
      this.placesService.create(place).subscribe({
        next: () => {
          alert('Serviço cadastrado com sucesso');
          this.routerService.navigate(['/']);
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          console.log('error', err);
          alert('Erro ao cadastrar serviço');
          this.loading = false;
        },
      });

      return;
    }

    this.placesService.update(this.placeID, place).subscribe({
      next: () => {
        alert('Serviço atualizado com sucesso');
        this.routerService.navigate([`/place-details/${this.placeID}`]);
      },
      error: () => {
        alert('Erro ao atualizar serviço');
      },
    });
  }
}
