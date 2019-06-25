import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: "app-group-form",
  templateUrl: "./group-form.component.html",
  styleUrls: ["./group-form.component.scss"]
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isSubmitting = false;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<GroupFormComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.groupForm = this.fb.group({
      name: ["", Validators.required],
      project_id: this.auth.currentUser.emp_code,
      is_general: ''
    });
  }

  onSubmit() {
    if(this.groupForm.invalid) { return; }

    console.log(this.groupForm.value)
  }

  get name() {
    return this.groupForm.get("name");
  }

  get project_id() {
    return this.groupForm.get("project_id");
  }

  get is_general() {
    return this.groupForm.get("is_general");
  }
}
