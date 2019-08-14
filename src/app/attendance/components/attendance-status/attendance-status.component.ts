import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ATTENDANCE_ABSENT, ATTENDANCE_ABSENT_OFFICIALLY, ATTENDANCE_PRESENT } from '../../models/attendance-codes';
import { AttendanceStatus } from '../../models/employee-wise-roster';
import { WageMonth } from '../../models/wage-month';
import { AttendanceStatusService } from '../../services/attendance-status.service';
import { WageMonthService } from '../../services/wage-month.service';
import { ChangeStatusComponent } from './change-status/change-status.component';

@Component({
  selector: 'app-attendance-status',
  templateUrl: './attendance-status.component.html',
  styleUrls: ['./attendance-status.component.scss']
})
export class AttendanceStatusComponent implements OnInit, OnDestroy {
  attendance: AttendanceStatus[];
  activeWageMonth: WageMonth;
  emp_code: FormControl;
  searchResult = [];
  empCodeSubs: Subscription;
  presentStatus = ATTENDANCE_PRESENT;
  officialAbsentStatus = ATTENDANCE_ABSENT_OFFICIALLY;
  onAbsentStatus = ATTENDANCE_ABSENT;
  startDate: Date;
  endDate: Date;

  constructor(
    private wageMonthService: WageMonthService,
    public auth: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    private attendStatusService: AttendanceStatusService) { }

  ngOnInit() {
    this.emp_code = new FormControl()

    this.empCodeSubs = this.emp_code.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (!data) return;
        if (data.length < 1) return;

        this.employeeService.searchEmployee(data).subscribe(response => {
          this.searchResult = response;
        });
      });

    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) return

      this.startDate = this.activeWageMonth.from_date
      this.endDate = this.activeWageMonth.to_date
      this.fetchAttendance();
    });
  }

  getAttendanceStatus(code: string) {
    return this.attendStatusService.status(code)
  }


  fetchAttendance() {
    this.attendStatusService.getEmpAttendanceStatus(
      this.startDate,
      this.endDate,
      this.emp_code.value
    )
      .subscribe(result => {
        // console.log(result)
        this.attendance = result
      })
  }

  onEdit(attend: AttendanceStatus) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      panelClass: "detail-dialog",
      width: '550px',
      height: '450px',
      data: attend
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.snackbar.open("Successfully modified the attendance status", "Dismiss", {
        duration: 1600
      });
      const index = this.attendance.indexOf(attend);
      this.attendance[index] = result;
      this.attendance = [...this.attendance]
    });
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.designation
      }`;
  }

  modifiedStatus(attend: AttendanceStatus) {
    return attend.modified_status ? "MARKED PRESENT" : ''
  }

  prevWageMonth() {

  }

  nextWageMonth() {

  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe();
  }
}
