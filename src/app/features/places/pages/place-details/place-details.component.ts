import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JoinPipe } from '../../pipes/join.pipe';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-place-details',
  imports: [HeaderComponent, FooterComponent, JoinPipe, CommonModule],
  templateUrl: './place-details.component.html',
  styleUrl: './place-details.component.css',
})
export class PlaceDetailsComponent {
  placeId!: number;
  place!: Place;
  safeEmbedLink!: SafeHtml;

  destroyRef = inject(DestroyRef);
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private readonly placesService: PlacesService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.placeId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.placesService
      .get(this.placeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (place: Place) => {
          this.place = place;
          this.safeEmbedLink = this.sanitizer.bypassSecurityTrustHtml(
            this.place.google_maps_embed_link
          );
          console.log(place.google_maps_embed_link);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
