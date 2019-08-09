import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmployeeWiseRoster } from '../models/employee-wise-roster';
import { ATTENDANCE_PRESENT, ATTENDANCE_ABSENT, ATTENDANCE_HALF_DAY, ATTENDANCE_LATE, ATTENDANCE_OFF_DAY } from '../models/attendance-codes';

@Injectable({
  providedIn: 'root'
})
export class AttendanceStatusService {

  constructor(private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getMyAttendanceStatus(fromDate: Date, toDate: Date): Observable<EmployeeWiseRoster[]> {
    const empCode = this.auth.currentUser.emp_code

    return this.http
      .get<EmployeeWiseRoster[]>(`${this.getUrl()}/attendance-status/employee/${empCode}?from_date=${fromDate}&to_date=${toDate}`)
      .pipe(catchError(err => this.handler.handleError(err)));
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
      case ATTENDANCE_OFF_DAY: {
        return "OFF";
      }
    }
  }
}
