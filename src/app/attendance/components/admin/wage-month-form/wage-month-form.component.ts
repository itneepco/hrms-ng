import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from './../../../../auth/services/auth.service';

@Component({
  selector: "app-wage-month-form",
  templateUrl: "./wage-month-form.component.html",
  styleUrls: ["./wage-month-form.component.scss"]
})
export class WageMonthFormComponent implements OnInit {
  wageMonthForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    public dialogRef: MatDialogRef<WageMonthFormComponent>) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.wageMonthForm = this.fb.group({
      project_id: this.auth.currentUser.project,
      wage_month: ["", Validators.required],
      from_date: ["", Validators.required],
      to_date: ["", Validators.required],
    });
  }

  onSubmit() {
    if(this.wageMonthForm.invalid) {
      return;
    }

    console.log(this.wageMonthForm.value);
  }

  get wage_month() {
    return this.wageMonthForm.get('wage_month')
  }

  get from_date() {
    return this.wageMonthForm.get('from_date')
  }

  get to_date() {
    return this.wageMonthForm.get('to_date')
  }
}
