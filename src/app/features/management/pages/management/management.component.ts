import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
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
import { Regional } from '../../models/regional.model';
import { Segment } from '../../models/segment.model';
import { ServiceType } from '../../models/service-type.model';
import { Router } from '@angular/router';
import { ShowMoreComponent } from '../../../../shared/components/show-more/show-more.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-management',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SingularizePipe,
    JoinPipe,
    ShowMoreComponent,
    LoadingComponent,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent implements OnInit {
  currentEntities: Array<Place | Regional | Segment | ServiceType> = [];
  entities = [
    { name: 'places', label: 'Serviços' },
    { name: 'segments', label: 'Eixos' },
    { name: 'service-types', label: 'Tipos de serviço' },
    { name: 'regionals', label: 'Regionais' },
  ];
  currentEntity!: Entity;

  destroyRef = inject(DestroyRef);

  hasMore = false;
  loading = true;

  constructor(
    private readonly placesService: PlacesService,
    private readonly regionalsService: RegionalsService,
    private readonly segmentsService: SegmentsService,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly routerService: Router
  ) {}

  ngOnInit(): void {
    this.setEntity('places');
  }

  setEntity(type: string) {
    this.loading = true;

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
                    p.reference_ways,
                    p.attendance_types,
                    p.service_type,
                    p.segment,
                    p.regionals
                  )
              );
              this.hasMore = places.metadata.pages > 1;
            },
            complete: () => {
              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              this.loading = false;
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
            complete: () => {
              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              this.loading = false;
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
            complete: () => {
              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              this.loading = false;
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
            complete: () => {
              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              this.loading = false;
            },
          });

        this.currentEntity = {
          id: 0,
          name: this.entities[3].label,
          type: this.entities[3].name,
        };
        break;
    }
  }

  isInstanceOfPlace(entity: Place | Regional | Segment | ServiceType): boolean {
    return entity instanceof Place;
  }

  getPlace(entity: Place | Regional | Segment | ServiceType): Place {
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
    this.loading = true;

    switch (type) {
      case 'places':
        this.placesService.delete(entity.id).subscribe({
          next: () => {
            alert('Serviço deletado com sucesso');
          },
          complete: () => {
            const index = this.currentEntities.findIndex(
              (e) => e.name === entity.name
            );

            this.currentEntities.splice(index, 1);

            this.loading = false;
          },
          error: (err) => {
            console.log('error:', err);

            alert('Erro ao deletar serviço');
            this.loading = false;
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
            next: () => {
              alert('Regional deletada com sucesso');
            },
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);

              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              alert('Erro ao deletar regional');
              this.loading = false;
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
            next: () => {
              alert('Eixo deletado com sucesso');
            },
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);

              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              alert('Erro ao deletar eixo');
              this.loading = false;
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
            next: () => {
              alert('Tipo de serviço deletado com sucesso');
            },
            complete: () => {
              const index = this.currentEntities.findIndex(
                (e) => e.name === entity.name
              );

              this.currentEntities.splice(index, 1);

              this.loading = false;
            },
            error: (err) => {
              console.log('error:', err);

              alert('Erro ao deletar tipo de serviço');
              this.loading = false;
            },
          });
        break;
      default:
        this.loading = false;
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
