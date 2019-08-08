import { Component, OnInit } from '@angular/core';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
import { WageMonth } from 'src/app/attendance/models/wage-month';
import { DateService } from 'src/app/attendance/services/date.service';
import { AttendanceDataService } from 'src/app/attendance/services/attendance-data.service';

@Component({
  selector: 'app-process-attendance',
  templateUrl: './process-attendance.component.html',
  styleUrls: ['./process-attendance.component.scss']
})
export class ProcessAttendanceComponent implements OnInit {
  activeWageMonth: WageMonth;
  startDate: Date;
  endDate: Date;
  dates: Date[];

  constructor(private wageMonthService: WageMonthService,
    private attendanceDataService: AttendanceDataService,
    private dateService: DateService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) return

      this.startDate = this.activeWageMonth.from_date
      this.endDate = this.activeWageMonth.to_date
      this.enumerateDays()
    })
  }

  enumerateDays() {
    this.dates = this.dateService
      .enumerateDaysBetweenDates(this.startDate, this.endDate);
  }

  processData(day: Date) {
    this.attendanceDataService.processPunchingData(day)
    .subscribe(data => console.log(data))
  }

}
