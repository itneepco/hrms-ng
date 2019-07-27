import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth.service";

import { Group } from "./../../../../models/group";
import { GroupService } from "./../../../../services/group.service";

@Component({
  selector: "app-group-form",
  templateUrl: "./group-form.component.html",
  styleUrls: ["./group-form.component.scss"]
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isSubmitting = false;
  group: Group;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<GroupFormComponent>,
    private fb: FormBuilder,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.group = this.data ? this.data : null;
    this.initForm();
  }

  initForm() {
    this.groupForm = this.fb.group({
      name: [this.group ? this.group.name : "", Validators.required],
      project_id: this.auth.currentUser.emp_code,
      is_general: [this.group ? this.group.is_general : false]
    });
  }

  onSubmit() {
    if (this.groupForm.invalid) return;

    // console.log(this.groupForm.value);
    this.isSubmitting = true;

    if (this.group && this.group.id) {
      this.groupService
        .editGroup(this.group.id, this.groupForm.value)
        .subscribe(
          (newValue: Group) => {
            this.isSubmitting = false;
            this.dialogRef.close(newValue);
          },
          error => (this.isSubmitting = false)
        );
    } else {
      this.groupService.addGroup(this.groupForm.value).subscribe(
        (value: Group) => {
          this.isSubmitting = false;
          this.dialogRef.close(value);
        },
        error => (this.isSubmitting = false)
      );
    }
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
