import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-absent-dtl-form",
  templateUrl: "./absent-dtl-form.component.html",
  styleUrls: ["./absent-dtl-form.component.scss"]
})
export class AbsentDtlFormComponent implements OnInit {
  absentForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AbsentDtlFormComponent>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.absentForm = this.fb.group({
      emp_code: [],
      from_date: [],
      to_date: [],
      leave_type_id: []
    });
  }

  get from_date() {
    return this.absentForm.get("from_date");
  }

  get to_date() {
    return this.absentForm.get("to_date");
  }

  get leave_type_id() {
    return this.absentForm.get("leave_type_id");
  }

  onSubmit() {}
}
