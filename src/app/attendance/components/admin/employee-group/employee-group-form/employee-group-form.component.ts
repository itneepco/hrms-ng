import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { EmployeeGroupService } from "src/app/attendance/services/employee-group.service";
import { GroupService } from "src/app/attendance/services/group.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { EmployeeService } from "src/app/shared/services/employee.service";

import { Group } from "./../../../../models/group";

@Component({
  selector: "app-employee-group-form",
  templateUrl: "./employee-group-form.component.html",
  styleUrls: ["./employee-group-form.component.scss"]
})
export class EmployeeGroupFormComponent implements OnInit, OnDestroy {
  empGroupForm: FormGroup;
  isSubmitting = false;
  groups: Group[] = [];
  subscription: Subscription;
  empSearchResult = [];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private auth: AuthService,
    private employeeService: EmployeeService,
    private empGroupService: EmployeeGroupService,
    public dialogRef: MatDialogRef<EmployeeGroupFormComponent>
  ) {}

  ngOnInit() {
    this.initForm();
    this.initEmployeeAutoComplete();
    this.groupService
      .getGroups(this.auth.currentUser.project)
      .subscribe(data => {
        console.log(data);
        this.groups = data;
      });
  }

  initEmployeeAutoComplete() {
    this.subscription = this.emp_name.valueChanges
      .pipe(debounceTime(500))
      .subscribe(name => {
        if (!name) return;
        if (name.length < 1) return;

        this.employeeService
          .searchEmployeeByName(name)
          .subscribe(response => (this.empSearchResult = response));
      });
  }

  initForm() {
    this.empGroupForm = this.fb.group({
      emp_name: ["", Validators.required],
      group_id: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.empGroupForm.invalid) return;

    const full_info = this.emp_name.value.split(",");
    const emp_code = full_info[1].trim();

    if (!emp_code) return;
    const emp_group = { emp_code: emp_code };

    this.isSubmitting = true;
    this.empGroupService
      .addEmployeeGroup(this.group_id.value, emp_group)
      .subscribe(
        data => {
          console.log(data);
          this.isSubmitting = false;
          this.dialogRef.close(data);
        },
        error => (this.isSubmitting = false)
      );
  }

  clearEmployeeSearch() {
    this.emp_name.reset();
    this.group_id.reset();
  }

  getFullName(item) {
    return this.employeeService.getFullName(item);
  }

  get emp_name() {
    return this.empGroupForm.get("emp_name");
  }

  get group_id() {
    return this.empGroupForm.get("group_id");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
