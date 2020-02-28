import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ATTEND_REG_CO_ACTIONS } from "src/app/attendance/models/attendance-codes";
import { AttendRegApplication, EmployeeAttendance, MutualEmployeeAttendance } from "src/app/attendance/models/attendance-regularize";
import { AttendanceStatusService } from 'src/app/attendance/services/attendance-status.service';
import { PunchRegularizeService } from "src/app/attendance/services/punch-regularize.service";

@Component({
  selector: "app-workflow-detail",
  templateUrl: "./workflow-detail.component.html",
  styleUrls: ["./workflow-detail.component.scss"]
})
export class WorkflowDetailComponent implements OnInit {
  attendRegApp: AttendRegApplication;
  step = 0;
  workflowForm: FormGroup;
  isSubmitting: false;
  actions = [];
  empAttend: EmployeeAttendance;
  mutualAttend: MutualEmployeeAttendance;

  constructor(
    private fb: FormBuilder,
    private attendService: AttendanceStatusService,
    public punchRegService: PunchRegularizeService,
    @Inject(MAT_DIALOG_DATA) private data: AttendRegApplication
  ) {}

  ngOnInit() {
    this.attendRegApp = this.data;
    this.actions = ATTEND_REG_CO_ACTIONS;
    this.initForm();

    this.punchRegService
      .getMyPunchings(this.attendRegApp.applier.emp_code, this.attendRegApp.day)
      .subscribe(data => this.empAttend = data);
    this.punchRegService.getMutualPunchings(this.attendRegApp.mutual_emp_code, this.attendRegApp.day)  
      .subscribe(data => this.mutualAttend = data);
  }

  initForm() {
    this.workflowForm = this.fb.group({
      workflow_action: ["", Validators.required],
      remarks: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.workflowForm.invalid) return;

    console.log(this.workflowForm.value);
  }

  setStep(index: number) {
    this.step = index;
  }

  applicationStatus(code: string) {
    return this.punchRegService.getStatus(code);
  }

  attendanceStatus(code: string) {
    return this.attendService.status(code)
  }

  get workflow_action() {
    return this.workflowForm.get("workflow_action");
  }

  get remarks() {
    return this.workflowForm.get("remarks");
  }
}
