import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AttendanceStatus } from "src/app/attendance/models/employee-wise-roster";
import { AttendanceStatusService } from "src/app/attendance/services/attendance-status.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { CtrlOfficer } from "src/app/shared/models/adressee";
import { HierarchyService } from "src/app/shared/services/hierarchy.service";

@Component({
  selector: "app-punch-regularize",
  templateUrl: "./punch-regularize.component.html",
  styleUrls: ["./punch-regularize.component.scss"]
})
export class PunchRegularizeComponent implements OnInit {
  attendance: AttendanceStatus;
  ctrlOfficers: CtrlOfficer[];
  regularizeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
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
  }

  initForm() {
    this.regularizeForm = this.fb.group({
      day: [this.attendance.day],
      type: ['', Validators.required],
      emp_code: [this.attendance.emp_code],
      addressee: ["", Validators.required],
      reason: ["", Validators.required]
    });
  }

  getStatus(code: string) {
    return this.attendStatusService.status(code);
  }
}
