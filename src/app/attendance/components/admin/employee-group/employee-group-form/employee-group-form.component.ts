import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupService } from 'src/app/attendance/services/group.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Group } from './../../../../models/group';

@Component({
  selector: "app-employee-group-form",
  templateUrl: "./employee-group-form.component.html",
  styleUrls: ["./employee-group-form.component.scss"]
})
export class EmployeeGroupFormComponent implements OnInit {
  empGroupForm: FormGroup;
  isSubmitting = false;
  groups: Group[] = [];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<EmployeeGroupFormComponent>
  ) {}

  ngOnInit() {
    this.initForm();

    this.groupService.getGroups(this.auth.currentUser.project)
    .subscribe(data => {
      console.log(data)
      this.groups = data;
    })
  }

  initForm() {
    this.empGroupForm = this.fb.group({
      emp_code: ["", Validators.required],
      group_id: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.empGroupForm.invalid) {
      return;
    }

    console.log(this.empGroupForm.value);
  }

  get emp_code() {
    return this.empGroupForm.get("emp_code");
  }

  get group_id() {
    return this.empGroupForm.get("group_id");
  }
}
