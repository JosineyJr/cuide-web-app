import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Segment } from '../../models/segment.model';
import { SegmentsService } from '../../services/segments.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segments',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './segments.component.html',
  styleUrl: './segments.component.css',
})
export class SegmentsComponent implements OnInit {
  segmentForm: FormGroup;
  segmentID: number | null;
  segment: Segment;
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly segmentsService: SegmentsService,
    private readonly router: Router
  ) {
    this.segmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.segmentID = null;
    this.segment = {
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    const segmentID = this.route.snapshot.paramMap.get('id');

    if (segmentID) {
      this.loading = true;
      this.segmentID = parseInt(segmentID);

      this.segmentsService.get(this.segmentID).subscribe({
        next: (segment: Segment) => {
          this.segment = segment;
          this.segmentForm.get('name')?.setValue(this.segment.name);
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          console.log('error', err);
          alert('Erro ao carregar eixo');
          this.loading = false;
        },
      });
    }
  }

  onSubmit() {
    this.loading = true;
    this.segment.name = this.segmentForm.get('name')?.value;

    if (this.segmentID) {
      this.segmentsService.update(this.segment).subscribe({
        next: (t: void) => {
          alert('Eixo atualizado com sucesso');
          this.router.navigate(['/management']);
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Erro ao atualizar eixo');
        },
      });

      return;
    }

    this.segmentsService.create(this.segment).subscribe({
      next: (t: void) => {
        alert('Eixo cadastrado com sucesso');
        this.router.navigate(['/management']);
      },
      complete: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao cadastrar eixo');
      },
    });
  }
}
