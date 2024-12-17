import {
  Component,
  inject,
  OnInit,
  DestroyRef,
  createComponent,
} from '@angular/core';
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
import { PlaceList } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { JoinPipe } from '../../pipes/join.pipe';
import { FormsModule } from '@angular/forms';
import { ShowMoreComponent } from '../../../../shared/components/show-more/show-more.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-browse-places',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    JoinPipe,
    FormsModule,
    ShowMoreComponent,
    LoadingComponent,
  ],
  templateUrl: './browse-places.component.html',
  styleUrl: './browse-places.component.css',
})
export class BrowsePlacesComponent implements OnInit {
  filters: Array<{
    name: string;
    label: string;
    values: Array<{ id: number; name: string }>;
  }> = [
    { name: 'segment', label: 'Categoria', values: [] },
    { name: 'service-type', label: 'Tipo de serviço', values: [] },
    { name: 'regional', label: 'Regional', values: [] },
  ];
  query: Map<string, Array<number>> = new Map();
  searchQuery!: string;
  loading = false;
  hasMore = true;

  dropdownStates: Map<string, boolean> = new Map();
  checkboxStates: Map<string, boolean> = new Map();

  places!: PlaceList;

  destroyRef = inject(DestroyRef);

  private debounceTimer: any;
  private page: number = 1;
  private debouceTimeout = 1000;

  constructor(
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly regionalsService: RegionalsService,
    public readonly placesService: PlacesService
  ) {}

  ngOnInit() {
    this.loading = true;
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

    this.placesService
      .list(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (placeList: PlaceList) => {
          this.places = placeList;
        },
        complete: () => {
          this.hasMore = this.places.metadata.pages > 1;
          this.loading = false;
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

  updateQuery(filterName: string, id: number) {
    if (!this.query.has(filterName)) {
      this.query.set(filterName, []);
    }

    const f = this.query.get(filterName);
    if (!f) {
      return;
    }

    if (f?.includes(id)) {
      const idx = f.findIndex((i) => i == id);
      f.splice(idx, 1);
    } else {
      f.push(id);
    }

    this.query.set(filterName, f);
  }

  buildQuery(page: number): string {
    const params = new URLSearchParams();
    params.append('page', page.toString());

    if (this.searchQuery?.length > 1) {
      params.append('name', this.searchQuery);
    }

    for (const [filterName, filterValues] of this.query.entries()) {
      for (const value of filterValues) {
        params.append(filterName, value.toString());
      }
    }

    return params.toString();
  }

  debounce() {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      const params = this.buildQuery(this.page);

      this.loading = true;
      this.placesService
        .filter(params)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (places: PlaceList) => {
            this.places = places;
            this.hasMore =
              this.places.places.length < this.places.metadata.total_places;
          },
          complete: () => {
            this.loading = false;
          },
        });
    }, this.debouceTimeout);
  }

  onCheckboxChange(filterName: string, id: number) {
    this.updateQuery(filterName, id);

    this.debounce();
  }

  search() {
    clearTimeout(this.debounceTimer);

    const params = this.buildQuery(this.page);

    this.loading = true;
    this.placesService
      .filter(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (places: PlaceList) => {
          this.places = places;
          this.hasMore =
            this.places.places.length < this.places.metadata.total_places;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  searchDebounce() {
    this.debounce();
  }

  onPlacesLoaded(newPlaces: PlaceList) {
    this.places.places = [...this.places.places, ...newPlaces.places];
    this.hasMore =
      this.places.places.length < this.places.metadata.total_places;
  }
}
