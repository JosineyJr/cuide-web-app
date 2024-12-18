import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceType } from '../../models/service-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceTypesService } from '../../services/service-types.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-types',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './service-types.component.html',
  styleUrl: './service-types.component.css',
})
export class ServiceTypesComponent implements OnInit {
  serviceTypeForm: FormGroup;
  serviceTypeID: number | null;
  serviceType: ServiceType;
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly serviceTypesService: ServiceTypesService,
    private readonly router: Router
  ) {
    this.serviceTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.serviceTypeID = null;
    this.serviceType = {
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    const serviceTypeID = this.route.snapshot.paramMap.get('id');

    if (serviceTypeID) {
      this.loading = true;
      this.serviceTypeID = parseInt(serviceTypeID);

      this.serviceTypesService.get(this.serviceTypeID).subscribe({
        next: (serviceType: ServiceType) => {
          this.serviceType = serviceType;
          this.serviceTypeForm.get('name')?.setValue(this.serviceType.name);
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          console.log('error', err);
          alert('Erro ao carregar tipo de serviço');
          this.loading = false;
        },
      });
    }
  }

  onSubmit() {
    this.loading = true;
    this.serviceType.name = this.serviceTypeForm.get('name')?.value;

    if (this.serviceTypeID) {
      this.serviceTypesService.update(this.serviceType).subscribe({
        next: (t: void) => {
          alert('Tipo de serviço atualizado com sucesso');
          this.router.navigate(['/management']);
        },
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Erro ao atualizar tipo de serviço');
        },
      });

      return;
    }

    this.serviceTypesService.create(this.serviceType).subscribe({
      next: (t: void) => {
        alert('Tipo de serviço cadastrado com sucesso');
        this.router.navigate(['/management']);
      },
      complete: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao cadastrar tipo de serviço');
      },
    });
  }
}
