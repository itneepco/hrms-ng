import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shift } from 'src/app/attendance/models/shift';
import { ShiftService } from 'src/app/attendance/services/shift.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: "app-shift-form",
  templateUrl: "./shift-form.component.html",
  styleUrls: ["./shift-form.component.scss"]
})
export class ShiftFormComponent implements OnInit {
  shiftForm: FormGroup;
  isSubmitting = false;
  shift: Shift;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShiftFormComponent>,
    private auth: AuthService,
    private shiftService: ShiftService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.shift = this.data ? this.data : null;
    this.initForm();
  }

  initForm() {
    this.shiftForm = this.fb.group({
      name: [this.shift ? this.shift.name : "", Validators.required],
      project_id: [this.auth.currentUser.project, Validators.required],
      in_time_start: [this.shift ? this.shift.in_time_start : "", Validators.required],
      in_time_end: [this.shift ? this.shift.in_time_end : "", Validators.required],
      out_time_start: [this.shift ? this.shift.out_time_start : "", Validators.required],
      out_time_end: [this.shift ? this.shift.out_time_end : "", Validators.required],
      late_time: [this.shift ? this.shift.late_time : "", Validators.required],
      half_time: [this.shift ? this.shift.half_time : "", Validators.required],
      is_night_shift: [this.shift ? this.shift.is_night_shift : ""]
    });
  }

  onSubmit() {
    if (this.shiftForm.invalid) {
      return;
    }
    console.log(this.shiftForm.value);

    const project_id = this.auth.currentUser.project;
    this.isSubmitting = true;

    if (this.shift && this.shift.id) {
      this.shiftService
        .editShift(project_id, this.shift.id, this.shiftForm.value)
        .subscribe(
          (newValue: Shift) => {
            this.isSubmitting = false;
            this.dialogRef.close(newValue);
          },
          error => (this.isSubmitting = false)
        );
    } else {
      this.shiftService.addShift(project_id, this.shiftForm.value).subscribe(
        (value: Shift) => {
          this.isSubmitting = false;
          this.dialogRef.close(value);
        },
        error => (this.isSubmitting = false)
      );
    }
  }

  get name() {
    return this.shiftForm.get("name");
  }

  get project_id() {
    return this.shiftForm.get("project_id");
  }

  get in_time_start() {
    return this.shiftForm.get("in_time_start");
  }

  get in_time_end() {
    return this.shiftForm.get("in_time_end");
  }

  get out_time_start() {
    return this.shiftForm.get("out_time_start");
  }

  get out_time_end() {
    return this.shiftForm.get("out_time_end");
  }

  get late_time() {
    return this.shiftForm.get("late_time");
  }

  get half_time() {
    return this.shiftForm.get("half_time");
  }

  get is_night_shift() {
    return this.shiftForm.get("is_night_shift");
  }
}
