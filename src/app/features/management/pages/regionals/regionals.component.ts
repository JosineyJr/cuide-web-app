import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Regional } from '../../models/regional.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionalsService } from '../../services/regionals.service';

@Component({
  selector: 'app-regionals',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './regionals.component.html',
  styleUrl: './regionals.component.css',
})
export class RegionalsComponent implements OnInit {
  regionalForm: FormGroup;
  regionalID: number | null;
  regional: Regional;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly regionalsService: RegionalsService,
    private readonly router: Router
  ) {
    this.regionalForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.regionalID = null;
    this.regional = {
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    const regionalID = this.route.snapshot.paramMap.get('id');

    if (regionalID) {
      this.regionalID = parseInt(regionalID);

      this.regionalsService.get(this.regionalID).subscribe({
        next: (regional: Regional) => {
          this.regional = regional;
          this.regionalForm.get('name')?.setValue(this.regional.name);
        },
      });
    }
  }

  onSubmit() {
    this.regional.name = this.regionalForm.get('name')?.value;

    if (this.regionalID) {
      this.regionalsService.update(this.regional).subscribe({
        next: (t: void) => {
          alert('Regional atualizada com sucesso');
          this.router.navigate(['/management']);
        },
        error: () => {
          alert('Erro ao atualizar regional');
        },
      });

      return;
    }

    this.regionalsService.create(this.regional).subscribe({
      next: (t: void) => {
        alert('Regional cadastrada com sucesso');
        this.router.navigate(['/management']);
      },
      error: () => {
        alert('Erro ao cadastrar regional');
      },
    });
  }
}
