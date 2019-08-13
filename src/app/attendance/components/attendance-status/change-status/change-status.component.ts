import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AttendanceStatus } from 'src/app/attendance/models/employee-wise-roster';
import { Shift } from 'src/app/attendance/models/shift';
import { AttendanceStatusService } from 'src/app/attendance/services/attendance-status.service';
import { ShiftService } from 'src/app/attendance/services/shift.service';
import { UpdateAttendanceService } from 'src/app/attendance/services/update-attendance.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit, OnDestroy {
  attendance: AttendanceStatus;
  shifts: Shift[] = [];
  isSubmitting = false;
  statusForm: FormGroup;
  subscription: Subscription;
  changeShift = false;

  constructor(public dialogRef: MatDialogRef<ChangeStatusComponent>,
    private shiftService: ShiftService,
    private fb: FormBuilder,
    private updateAttendService: UpdateAttendanceService,
    private attendStatusService: AttendanceStatusService,
    @Inject(MAT_DIALOG_DATA) private data: AttendanceStatus) { }

  ngOnInit() {
    this.attendance = this.data
    console.log(this.attendance)

    this.shiftService.getShiftPunchings().subscribe(shifts => {
      // console.log(shifts)
      this.shifts = shifts
    })

    this.initForm()

    this.subscription = this.action.valueChanges.subscribe(data => {
      if (data == 2) {
        this.shift.setValidators(Validators.required);
        this.changeShift = true
      } else {
        this.shift.clearValidators();
        this.shift.reset()
        this.changeShift = false
      }
    });
  }

  initForm() {
    this.statusForm = this.fb.group({
      action: ['', Validators.required],
      shift: [''],
      remarks: ['', Validators.required]
    })
  }

  getStatus(code: string) {
    return this.attendStatusService.status(code)
  }

  onSave() {
    if (this.statusForm.invalid) return;

    if (this.action.value == 1) {
      const data = {
        remarks: this.remarks.value
      }
      this.updateAttendService.markAsPresent(this.attendance.emp_code, data)
        .subscribe(data => {
          console.log(data)
          this.dialogRef.close(data)
        })
    }

    if (this.action.value == 2) {
      const data = {
        new_shift_id: this.shift.value,
        remarks: this.remarks.value
      }
      this.updateAttendService.changeShiftTiming(this.attendance.emp_code, data)
        .subscribe(data => {
          console.log(data)
          this.dialogRef.close(data)
        })
    }
  }

  getShiftName(shiftId: number) {
    const shift = this.shifts.find(shift => shift.id == shiftId)
    return shift ? shift.name : ''
  }

  get remarks() {
    return this.statusForm.get('remarks')
  }

  get action() {
    return this.statusForm.get('action')
  }

  get shift() {
    return this.statusForm.get('shift')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
