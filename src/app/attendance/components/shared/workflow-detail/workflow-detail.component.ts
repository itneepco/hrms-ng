import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ATTEND_REG_CO_ACTIONS, ATTEND_REG_TIME_ACTIONS, RECOMMENDED } from "src/app/attendance/models/attendance-codes";
import { AttendRegApplication, EmployeeAttendance, MutualEmployeeAttendance } from "src/app/attendance/models/attendance-regularize";
import { AttendanceStatusService } from "src/app/attendance/services/attendance-status.service";
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-workflow-detail",
  templateUrl: "./workflow-detail.component.html",
  styleUrls: ["./workflow-detail.component.scss"]
})
export class WorkflowDetailComponent implements OnInit {
  attendRegApp: AttendRegApplication;
  step = 0;
  workflowForm: FormGroup;
  isSubmitting = false;
  actions = [];
  empAttend: EmployeeAttendance;
  mutualAttend: MutualEmployeeAttendance;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<WorkflowDetailComponent>,
    private snackbar: MatSnackBar,
    private attendService: AttendanceStatusService,
    public punchRegService: PunchRegularizeService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.attendRegApp = this.data.attendReg;
    this.actions = this.data.actions;

    this.initForm();

    this.punchRegService
      .getMyPunchings(this.attendRegApp.applier.emp_code, this.attendRegApp.day)
      .subscribe(data => (this.empAttend = data));

    if (this.attendRegApp.mutual_emp_code) {
      this.punchRegService
        .getMutualPunchings(
          this.attendRegApp.mutual_emp_code,
          this.attendRegApp.day
        )
        .subscribe(data => (this.mutualAttend = data));
    }
  }

  initForm() {
    this.workflowForm = this.fb.group({
      application_id: [this.attendRegApp.id],
      emp_code: [this.auth.currentUser.emp_code],
      workflow_action: ["", Validators.required],
      remarks: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.workflowForm.invalid) return;

    console.log(this.workflowForm.value);
    this.isSubmitting = true;

    let observable;
    if (
      this.auth.isTimeOfficeAdmin() &&
      this.attendRegApp.status == RECOMMENDED
    ) {
      observable = this.punchRegService.procesApproveWorkflow(
        this.attendRegApp.id,
        this.workflowForm.value
      );
    } else {
      observable = this.punchRegService.processRecommendWorkfow(
        this.attendRegApp.id,
        this.workflowForm.value
      );
    }
    observable.subscribe(
      data => {
        this.dialogRef.close(data);
        this.isSubmitting = false;
        this.snackbar.open(
          "Successfully processed the leave request",
          "Dismiss",
          { duration: 1600 }
        );
      },
      err => {
        this.isSubmitting = false;
        this.snackbar.open(
          "An error occured!! Please try again later!!",
          "Dismiss",
          { duration: 1600 }
        );
      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  applicationStatus(code: string) {
    return this.punchRegService.getStatus(code);
  }

  attendanceStatus(code: string) {
    return this.attendService.status(code);
  }

  get workflow_action() {
    return this.workflowForm.get("workflow_action");
  }

  get remarks() {
    return this.workflowForm.get("remarks");
  }
}
