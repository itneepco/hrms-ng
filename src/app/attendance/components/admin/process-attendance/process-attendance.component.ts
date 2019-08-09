import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WageMonth } from 'src/app/attendance/models/wage-month';
import { AttendanceDataService } from 'src/app/attendance/services/attendance-data.service';
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
  biometricFileStatus;

  constructor(private wageMonthService: WageMonthService,
    private snackbar: MatSnackBar,
    private attendanceDataService: AttendanceDataService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      this.activeWageMonth = wageMonth
      if (!this.activeWageMonth) return

      this.startDate = this.activeWageMonth.from_date
      this.endDate = this.activeWageMonth.to_date

      this.attendanceDataService.getFileUploadedStatus(this.startDate, this.endDate)
        .subscribe(result => {
          // console.log(result)
          this.biometricFileStatus = result
        })
    })
  }

  processData(day: Date) {
    this.attendanceDataService.processPunchingData(day)
      .subscribe(data => {
        console.log(data) 
        this.snackbar.open(
          `Successfully processed attendance data for the day ${day}`,
          "Dismiss",
          {
            duration: 2000
          }
        );
      })
  }

}
