import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ATTENDANCE_ABSENT, ATTENDANCE_ABSENT_OFFICIALLY, ATTENDANCE_HALF_DAY, ATTENDANCE_HOLIDAY, ATTENDANCE_LATE, ATTENDANCE_OFF_DAY, ATTENDANCE_PRESENT } from '../models/attendance-codes';
import { AttendanceStatus } from '../models/employee-wise-roster';

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

  getEmpAttendanceStatus(fromDate: Date, toDate: Date, empCode?: string): Observable<AttendanceStatus[]> {
    const emp_code = empCode ? empCode : this.auth.currentUser.emp_code

    return this.http
      .get<AttendanceStatus[]>(`${this.getUrl()}/attendance-status/employee/${emp_code}?from_date=${fromDate}&to_date=${toDate}`)
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
      case ATTENDANCE_HOLIDAY: {
        return "HOLIDAY"
      }
      case ATTENDANCE_ABSENT_OFFICIALLY: {
        return "ABSENT"
      }
    }
  }
}
