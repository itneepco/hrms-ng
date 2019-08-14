import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";
import { baseURL } from "./../../shared/config/baseUrl";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AttendanceDataService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/attendance-data`
    );
  }

  getFileUploadedStatus(fromDate: Date, toDate: Date) { 
    return this.http
      .get(`${this.getUrl()}/upload/status?from_date=${fromDate}&to_date=${toDate}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  processPunchingData(day: Date): Observable<any> {
    return this.http
      .get(`${this.getUrl()}/process?day=${day}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  markAsPresent(status) {
    return this.http
      .post(`${this.getUrl()}/modify/status`, status)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  changeShiftTiming(status) {
    return this.http
      .post(`${this.getUrl()}/modify/shift`, status)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
