import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReferenceWay } from '../../models/reference-way.model';
import { ReferenceWaysService } from '../../services/reference-ways.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reference-ways',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './reference-ways.component.html',
  styleUrl: './reference-ways.component.css',
})
export class ReferenceWaysComponent implements OnInit {
  referenceWayForm: FormGroup;
  referenceWayID: number | null;
  referenceWay: ReferenceWay;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly referenceWaysService: ReferenceWaysService
  ) {
    this.referenceWayForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.referenceWayID = null;
    this.referenceWay = {
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    const referenceWayID = this.route.snapshot.paramMap.get('id');

    if (referenceWayID) {
      this.referenceWayID = parseInt(referenceWayID);

      this.referenceWaysService.get(this.referenceWayID).subscribe({
        next: (referenceWay: ReferenceWay) => {
          this.referenceWay = referenceWay;
          this.referenceWayForm.get('name')?.setValue(this.referenceWay.name);
        },
      });
    }
  }

  onSubmit() {
    this.referenceWay.name = this.referenceWayForm.get('name')?.value;

    if (this.referenceWayID) {
      this.referenceWaysService.update(this.referenceWay).subscribe({
        next: (t: void) => {},
      });

      return;
    }

    this.referenceWaysService.create(this.referenceWay).subscribe({
      next: (t: void) => {},
    });
  }
}
