import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AttendanceStatus } from "src/app/attendance/models/employee-wise-roster";
import { AttendanceStatusService } from "src/app/attendance/services/attendance-status.service";
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { CtrlOfficer } from "src/app/shared/models/adressee";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { HierarchyService } from "src/app/shared/services/hierarchy.service";
import { APPLIED } from "src/app/attendance/models/attendance-codes";

@Component({
  selector: "app-punch-regularize",
  templateUrl: "./punch-regularize.component.html",
  styleUrls: ["./punch-regularize.component.scss"]
})
export class PunchRegularizeComponent implements OnInit, OnDestroy {
  attendance: AttendanceStatus;
  ctrlOfficers: CtrlOfficer[];
  regularizeForm: FormGroup;
  isMutualFlag = false;
  empCodeSubs: Subscription;
  searchResult = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private punchRegService: PunchRegularizeService,
    public dialogRef: MatDialogRef<PunchRegularizeComponent>,
    private hierarchyService: HierarchyService,
    private attendStatusService: AttendanceStatusService,
    @Inject(MAT_DIALOG_DATA) private data: AttendanceStatus
  ) {}

  ngOnInit() {
    this.attendance = this.data;

    this.hierarchyService
      .getParents(this.auth.currentUser.emp_code)
      .subscribe(ctrlOfficers => (this.ctrlOfficers = ctrlOfficers));

    this.initForm();

    this.empCodeSubs = this.mutual_emp_code.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (!data) return;
        if (data.length < 1) return;

        this.employeeService.searchEmployee(data).subscribe(response => {
          this.searchResult = response;
        });
      });
  }

  initForm() {
    this.regularizeForm = this.fb.group({
      day: [this.attendance.day],
      emp_code: [this.attendance.emp_code],
      addresse: ["", Validators.required],
      reason: ["", Validators.required],
      isMutual: this.isMutualFlag,
      mutual_emp_code: [""]
    });
  }

  getStatus(code: string) {
    return this.attendStatusService.status(code);
  }

  onMutual(event) {
    if (event.checked) {
      this.isMutualFlag = true;
      this.mutual_emp_code.setValidators(Validators.required);
    } else {
      this.isMutualFlag = false;
      this.mutual_emp_code.clearValidators();
      this.mutual_emp_code.updateValueAndValidity();
    }
  }

  onSumit() {
    if (this.regularizeForm.invalid) return;

    this.isSubmitting = true;
    this.punchRegService
      .addPunchRegularize(this.regularizeForm.value)
      .subscribe(
        result => {
          this.isSubmitting = false;
          this.dialogRef.close({ status: APPLIED });
          this.snackbar.open(
            "Successfully submitted attendance regularization application",
            "Dismiss",
            { duration: 2000 }
          );
        },
        () => {
          this.isSubmitting = false;
          this.snackbar.open(
            "An error occured!! Please try again later!!",
            "Dismiss",
            { duration: 2000 }
          );
        }
      );
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${item.designation}`;
  }

  get reason() {
    return this.regularizeForm.get("reason");
  }

  get addresse() {
    return this.regularizeForm.get("addresse");
  }

  get mutual_emp_code() {
    return this.regularizeForm.get("mutual_emp_code");
  }

  get isMutual() {
    return this.regularizeForm.get("isMutual");
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe();
  }
}
