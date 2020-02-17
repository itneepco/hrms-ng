import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { WageMonth } from "src/app/attendance/models/wage-month";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { DateService } from "src/app/shared/services/date.service";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";

@Injectable({
  providedIn: "root"
})
export class AbsenteeStatementService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dateService: DateService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/month-end`
    );
  }

  getAbsenteeStatement(fromDate: Date, toDate: Date): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.getUrl()}/absentee-statement?from_date=${fromDate}&to_date=${toDate}`
      )
      .pipe(
        map((result: any) => {
          console.log(result);
          result.data.sort(this.fieldSorter(["department", "name"]));
          return result;
        }),
        catchError(err => this.handler.handleError(err))
      );
  }

  processMonthEnd(): Observable<any> {
    return this.http
      .get<any>(`${this.getUrl()}/close`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  generatePDF(startDate: Date, endDate: Date, dataSource: any[], deptName: string) {
    const from_date = this.dateService.getDateDDMMMYYYY(startDate);
    const to_date = this.dateService.getDateDDMMMYYYY(endDate);

    const head = [
      [
        "Sl No",
        "Name",
        "Emp Code",
        "Department",
        "Absent Days (Date)",
        "Half Day (Date)",
        "Late Days (Date)",
        "Absent Day Count"
      ]
    ];

    const data = dataSource.map((row, index) => {
      return [
        index + 1,
        row.name.toUpperCase(),
        row.emp_code,
        row.department.toUpperCase(),
        row.absent_days.map(day => day.split("-")[2]),
        row.half_days.map(day => day.split("-")[2]),
        row.late_days.map(day => day.split("-")[2]),
        row.total_absent_days_count
      ];
    });

    const doc = new jsPDF({
      orientation: "landscape"
    });

    doc.setFontSize(14);
    doc.text(
      10,
      15,
      `Absentee Statement for the wage month from ${from_date} to ${to_date}`
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
    const department = deptName ? deptName : "all"
    doc.save(`${department}_absentee.pdf`);
  }

  // Sorting array based on multiple fields
  private fieldSorter = fields => (a, b) =>
    fields
      .map(o => {
        let dir = 1;
        return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
      })
      .reduce((p, n) => (p ? p : n), 0);
}
