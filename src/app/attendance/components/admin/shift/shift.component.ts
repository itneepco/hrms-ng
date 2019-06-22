import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ShiftFormComponent } from './shift-form/shift-form.component';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  shiftForm: FormGroup

  constructor(private location: Location,
    private dialog: MatDialog,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.shiftForm = this.fb.group({
      name: ['', Validators.required],
      project_id: [this.auth.currentUser.project, Validators.required],
      in_time_start: ['', Validators.required],
      in_time_end: ['', Validators.required],
      out_time_start: ['', Validators.required],
      late_time: ['', Validators.required],
      half_time: ['', Validators.required],
      is_night_shift: ['', Validators.required],
    })
  }

  goBack() {
    this.location.back();
  }

  onAddShift() {
    this.dialog.open(ShiftFormComponent, {
      width: '550px',
      height: '450px'
    })
  }
}
