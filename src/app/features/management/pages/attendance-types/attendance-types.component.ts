import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceType } from '../../models/attendance-type.model';
import { AttendanceTypesService } from '../../services/attendance-types.service';

@Component({
  selector: 'app-attendance-types',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './attendance-types.component.html',
  styleUrl: './attendance-types.component.css',
})
export class AttendanceTypesComponent implements OnInit {
  attendanceTypeForm: FormGroup;
  attendanceTypeID: number | null;
  attendanceType: AttendanceType;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly attendanceTypesService: AttendanceTypesService
  ) {
    this.attendanceTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.attendanceTypeID = null;
    this.attendanceType = {
      id: 0,
      name: '',
    };
  }

  ngOnInit(): void {
    const attendanceTypeID = this.route.snapshot.paramMap.get('id');

    if (attendanceTypeID) {
      this.attendanceTypeID = parseInt(attendanceTypeID);

      this.attendanceTypesService.get(this.attendanceTypeID).subscribe({
        next: (attendanceType: AttendanceType) => {
          this.attendanceType = attendanceType;
          this.attendanceTypeForm
            .get('name')
            ?.setValue(this.attendanceType.name);
        },
      });
    }
  }

  onSubmit() {
    this.attendanceType.name = this.attendanceTypeForm.get('name')?.value;

    if (this.attendanceTypeID) {
      this.attendanceTypesService.update(this.attendanceType).subscribe({
        next: (t: void) => {},
      });

      return;
    }

    this.attendanceTypesService.create(this.attendanceType).subscribe({
      next: (t: void) => {},
    });
  }
}
