import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-shift-form",
  templateUrl: "./shift-form.component.html",
  styleUrls: ["./shift-form.component.scss"]
})
export class ShiftFormComponent implements OnInit {
  shiftForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShiftFormComponent>,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.shiftForm = this.fb.group({
      name: ["", Validators.required],
      project_id: [this.auth.currentUser.project, Validators.required],
      in_time_start: ["", Validators.required],
      in_time_end: ["", Validators.required],
      out_time_start: ["", Validators.required],
      out_time_end: ["", Validators.required],
      late_time: ["", Validators.required],
      half_time: ["", Validators.required],
      is_night_shift: ""
    });
  }

  onSubmit() {
    if (this.shiftForm.invalid) {
      return;
    }

    console.log(this.shiftForm.value);
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
