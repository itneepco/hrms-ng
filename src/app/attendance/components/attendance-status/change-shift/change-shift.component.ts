import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AttendanceStatus } from "src/app/attendance/models/employee-wise-roster";
import { Shift } from "src/app/attendance/models/shift";
import { AttendanceDataService } from "src/app/attendance/services/attendance-data.service";
import { AttendanceStatusService } from "src/app/attendance/services/attendance-status.service";
import { ShiftService } from "src/app/attendance/services/shift.service";
import {
  ATTENDANCE_OFF_DAY,
  ATTENDANCE_HOLIDAY,
  ATTENDANCE_PRESENT
} from "src/app/attendance/models/attendance-codes";

@Component({
  selector: "app-change-shift",
  templateUrl: "./change-shift.component.html",
  styleUrls: ["./change-shift.component.scss"]
})
export class ChangeShiftComponent implements OnInit, OnDestroy {
  attendance: AttendanceStatus;
  shifts: Shift[] = [];
  isSubmitting = false;
  statusForm: FormGroup;
  subscription: Subscription;
  changeShift = false;

  constructor(
    public dialogRef: MatDialogRef<ChangeShiftComponent>,
    private shiftService: ShiftService,
    private fb: FormBuilder,
    private attenDataService: AttendanceDataService,
    private attendStatusService: AttendanceStatusService,
    @Inject(MAT_DIALOG_DATA) private data: AttendanceStatus
  ) {}

  ngOnInit() {
    this.attendance = this.data;
    console.log(this.attendance);

    this.shiftService.getShifts().subscribe(shifts => {
      // console.log(shifts)
      this.shifts = shifts.filter(shift => shift.working_hours > 0);
    });

    this.initForm();

    this.subscription = this.action.valueChanges.subscribe(data => {
      if (data == 2) {
        this.shift.setValidators(Validators.required);
        this.changeShift = true;
      } else {
        this.shift.clearValidators();
        this.shift.reset();
        this.changeShift = false;
      }
    });
  }

  initForm() {
    this.statusForm = this.fb.group({
      action: ["", Validators.required],
      shift: [""],
      remarks: [
        this.attendance ? this.attendance.remarks : "",
        Validators.required
      ]
    });
  }

  onSave() {
    if (this.statusForm.invalid) return;

    if (this.action.value == 1) {
      const data = {
        id: this.attendance.id,
        remarks: this.remarks.value
      };
      this.attenDataService.markAsPresent(data).subscribe(data => {
        // console.log(data)
        this.dialogRef.close(data);
      });
    }

    if (this.action.value == 2) {
      const data = {
        id: this.attendance.id,
        shift_id: this.shift.value,
        remarks: this.remarks.value
      };
      this.attenDataService.changeShiftTiming(data).subscribe(data => {
        console.log(data);
        this.dialogRef.close(data);
      });
    }
  }

  getStatus(code: string) {
    return this.attendStatusService.status(code);
  }
  
  getShiftName(shiftId: number) {
    const shift = this.shifts.find(shift => shift.id == shiftId);
    return shift ? shift.name : "";
  }

  get remarks() {
    return this.statusForm.get("remarks");
  }

  get action() {
    return this.statusForm.get("action");
  }

  get shift() {
    return this.statusForm.get("shift");
  }

  // get isHolidayPresentOff(): boolean {
  //   const status = this.attendance.attendance_status;
  //   return (
  //     status == ATTENDANCE_HOLIDAY ||
  //     status == ATTENDANCE_PRESENT ||
  //     status == ATTENDANCE_OFF_DAY
  //   );
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
