import { Component, OnInit } from '@angular/core';
import { AttendanceStatusService } from '../../services/attendance-status.service';
import { EmployeeWiseRoster } from '../../models/employee-wise-roster';
import { WageMonthService } from '../../services/wage-month.service';
import { WageMonth } from '../../models/wage-month';

@Component({
  selector: 'app-attendance-status',
  templateUrl: './attendance-status.component.html',
  styleUrls: ['./attendance-status.component.scss']
})
export class AttendanceStatusComponent implements OnInit {
  attendance: EmployeeWiseRoster[];
  activeWageMonth: WageMonth;

  constructor(
    private wageMonthService: WageMonthService,
    private attendStatusService: AttendanceStatusService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) return

      this.attendStatusService.getMyAttendanceStatus(
        this.activeWageMonth.from_date,
        this.activeWageMonth.to_date
      )
        .subscribe(result => {
          console.log(result)
          this.attendance = result
        })
    });
  }

  getAttendanceStatus(code: string) {
    return this.attendStatusService.status(code)
  }
}
