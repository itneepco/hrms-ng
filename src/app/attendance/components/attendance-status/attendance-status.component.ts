import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceStatusService } from '../../services/attendance-status.service';
import { EmployeeWiseRoster } from '../../models/employee-wise-roster';
import { WageMonthService } from '../../services/wage-month.service';
import { WageMonth } from '../../models/wage-month';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-attendance-status',
  templateUrl: './attendance-status.component.html',
  styleUrls: ['./attendance-status.component.scss']
})
export class AttendanceStatusComponent implements OnInit, OnDestroy {
  attendance: EmployeeWiseRoster[];
  activeWageMonth: WageMonth;
  emp_code: FormControl;
  searchResult = [];
  empCodeSubs: Subscription;

  constructor(
    private wageMonthService: WageMonthService,
    public auth: AuthService,
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

      this.fetchAttendance();
    });
  }

  getAttendanceStatus(code: string) {
    return this.attendStatusService.status(code)
  }


  fetchAttendance() {
    this.attendStatusService.getEmpAttendanceStatus(
      this.activeWageMonth.from_date,
      this.activeWageMonth.to_date,
      this.emp_code.value
    )
      .subscribe(result => {
        // console.log(result)
        this.attendance = result
      })
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.designation
      }`;
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe();
  }
}
