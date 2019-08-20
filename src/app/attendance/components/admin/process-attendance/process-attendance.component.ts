import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendanceFileStatus } from 'src/app/attendance/models/attendance-file-status';
import { WageMonth } from 'src/app/attendance/models/wage-month';
import { AttendanceDataService } from 'src/app/attendance/services/attendance-data.service';
import { DateService } from 'src/app/attendance/services/date.service';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';

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
  biometricFileStatus: AttendanceFileStatus[];

  constructor(private wageMonthService: WageMonthService,
    private snackbar: MatSnackBar,
    private dateService: DateService,
    private attendanceDataService: AttendanceDataService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      if (!wageMonth) return

      this.activeWageMonth = wageMonth
      this.startDate = this.activeWageMonth.from_date
      this.endDate = this.dateService.increaseDateByMonth(this.activeWageMonth.to_date, 1)

      this.attendanceDataService.getFileUploadedStatus(this.startDate, this.endDate)
        .subscribe(result => {
          // console.log(result)
          this.biometricFileStatus = result
        })
    })
  }

  processData(status: AttendanceFileStatus) {
    this.attendanceDataService.processPunchingData(status.punch_day)
      .subscribe(data => {
        // console.log(data)
        this.snackbar.open(
          data.message,
          "Dismiss",
          {
            duration: 2000
          }
        );
        status.is_processed = true;
      })
  }
}
