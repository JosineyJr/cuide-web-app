import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-place-details',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './place-details.component.html',
  styleUrl: './place-details.component.css',
})
export class PlaceDetailsComponent {
  placeId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('id')!;
    console.log('Place ID:', this.placeId);
  }
}
