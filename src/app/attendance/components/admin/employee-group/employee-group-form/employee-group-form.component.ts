import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { EmployeeGroupService } from "src/app/attendance/services/employee-group.service";
import { GroupService } from "src/app/attendance/services/group.service";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { Employee } from "./../../../../../shared/models/employee";
import { EmployeeGroupDtl } from "./../../../../models/employee-group";
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
  empGroup: EmployeeGroupDtl;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private employeeService: EmployeeService,
    private empGroupService: EmployeeGroupService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EmployeeGroupFormComponent>
  ) {}

  ngOnInit() {
    this.empGroup = this.data.empGroup ? this.data.empGroup : null;

    this.initForm();
    this.initEmployeeAutoComplete();
    this.groupService.getGroups().subscribe(data => (this.groups = data));
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
      emp_name: [
        this.empGroup ? this.getFullName(this.empGroup.employee) : "",
        Validators.required
      ],
      group_id: [
        this.empGroup ? this.empGroup.group_id : "",
        Validators.required
      ]
    });
  }

  onSubmit() {
    if (this.empGroupForm.invalid) return;

    const full_info = this.emp_name.value.split(",");
    const emp_code = full_info[1].trim();

    if (!emp_code) return;

    const requestData = {
      emp_code: emp_code,
      group_id: this.group_id.value
    };

    this.isSubmitting = true;
    if (this.empGroup && this.empGroup.id) {
      this.empGroupService
        .editEmployeeGroup(this.empGroup.id, requestData)
        .subscribe(
          data => {
            this.isSubmitting = false;
            this.dialogRef.close(data);
          },
          error => (this.isSubmitting = false)
        );
    } else {
      this.empGroupService.addEmployeeGroup(requestData).subscribe(
        data => {
          this.isSubmitting = false;
          this.dialogRef.close(data);
        },
        error => (this.isSubmitting = false)
      );
    }
  }

  clearEmployeeSearch() {
    this.emp_name.reset();
    this.group_id.reset();
    this.empGroup = null;
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
