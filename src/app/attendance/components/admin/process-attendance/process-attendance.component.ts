import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AttendanceFileStatus } from "src/app/attendance/models/attendance-file-status";
import { WageMonth } from "src/app/attendance/models/wage-month";
import { AttendanceDataService } from "src/app/attendance/services/attendance-data.service";
import { WageMonthService } from "src/app/attendance/services/wage-month.service";
import { DateService } from "src/app/shared/services/date.service";

@Component({
  selector: "app-process-attendance",
  templateUrl: "./process-attendance.component.html",
  styleUrls: ["./process-attendance.component.scss"]
})
export class ProcessAttendanceComponent implements OnInit {
  activeWageMonth: WageMonth;
  startDate: Date;
  endDate: Date;
  dates: Date[];
  biometricFileStatus: AttendanceFileStatus[];

  constructor(
    private wageMonthService: WageMonthService,
    private snackbar: MatSnackBar,
    private dateService: DateService,
    private attendanceDataService: AttendanceDataService
  ) {}

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      if (!wageMonth) return;

      this.activeWageMonth = wageMonth;
      this.startDate = this.activeWageMonth.from_date;
      this.endDate = this.dateService.increaseDateByMonth(
        this.activeWageMonth.to_date,
        1
      );

      this.attendanceDataService
        .getFileUploadedStatus(this.startDate, this.endDate)
        .subscribe(result => {
          // console.log(result)
          this.biometricFileStatus = result;
        });
    });
  }

  processData(status: AttendanceFileStatus) {
    if (this.dateService.compareDates(new Date(), status.punch_day)) {
      this.snackbar.open(
        "Please process the attendance data one day later",
        "Dismiss",
        { duration: 2000 }
      );
      return;
    }

    this.attendanceDataService.processPunchingData(status.punch_day).subscribe(
      result => {
        // console.log(result)
        this.snackbar.open(result.message, "Dismiss", { duration: 2000 });
        status.is_processed = result.error ? false : true;
      },
      err => {
        status.is_processed = false;
      }
    );
  }
}
