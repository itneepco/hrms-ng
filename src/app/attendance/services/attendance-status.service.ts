import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import {
  ATTENDANCE_ABSENT,
  ATTENDANCE_ABSENT_OFFICIALLY,
  ATTENDANCE_HALF_DAY,
  ATTENDANCE_HOLIDAY,
  ATTENDANCE_LATE,
  ATTENDANCE_OFF_DAY,
  ATTENDANCE_PRESENT,
  ATTENDANCE_5D_LATE
} from "../models/attendance-codes";
import { AttendanceStatus } from "../models/employee-wise-roster";
import { WageMonth } from "../models/wage-month";
import { DateService } from "src/app/shared/services/date.service";
import jsPDF from "jspdf";
import "jspdf-autotable";

@Injectable({
  providedIn: "root"
})
export class AttendanceStatusService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dateService: DateService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getEmpAttendanceStatus(
    fromDate: Date,
    toDate: Date,
    empCode?: string
  ): Observable<AttendanceStatus[]> {
    const emp_code = empCode ? empCode : this.auth.currentUser.emp_code;

    return this.http
      .get<AttendanceStatus[]>(
        `${this.getUrl()}/attendance-status/employee/${emp_code}?from_date=${fromDate}&to_date=${toDate}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  generatePdf(startDate: Date, endDate: Date, dataSource: any[], empCode: string) {
    const from_date = this.dateService.getDateDDMMMYYYY(startDate);
    const to_date = this.dateService.getDateDDMMMYYYY(endDate);

    const head = [
      [
        "Day",
        "Shift",
        "In time",
        "Out time",
        "Status",
        "Modified Status",
        "Remarks"
      ]
    ];

    const data = dataSource.map((row, index) => {
      return [
        row.day,
        row.shift.name,
        row.in_time,
        row.out_time,
        this.status(row.attendance_status),
        row.modified_status ? "MARKED PRESENT" : "",
        row.remarks ? row.remarks.trim() : null
      ];
    });

    const doc = new jsPDF({
      orientation: "portrait"
    });

    doc.setFontSize(14);
    doc.text(
      10,
      14,
      `Attendance Statement for ${empCode} for the period ${from_date} to ${to_date}`
    );

    doc.autoTable({
      startY: 20,
      margin: { horizontal: 10 },
      head: head,
      body: data,
      theme: "grid",
      headStyles: {
        fillColor: [88, 44, 79]
      },
      styles: {
        fontSize: 9,
        cellPadding: 2
      }
    });

    doc.save(`${empCode}_attendance.pdf`);
  }

  status(code: string) {
    switch (code) {
      case ATTENDANCE_PRESENT: {
        return "PRESENT";
      }
      case ATTENDANCE_ABSENT: {
        return "ABSENT";
      }
      case ATTENDANCE_HALF_DAY: {
        return "HALF DAY";
      }
      case ATTENDANCE_LATE: {
        return "LATE";
      }
      case ATTENDANCE_5D_LATE: {
        return "5D LATE";
      }
      case ATTENDANCE_OFF_DAY: {
        return "OFF";
      }
      case ATTENDANCE_HOLIDAY: {
        return "HOLIDAY";
      }
      case ATTENDANCE_ABSENT_OFFICIALLY: {
        return "ABSENT";
      }
    }
  }
}
