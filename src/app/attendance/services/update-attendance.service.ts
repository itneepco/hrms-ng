import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateAttendanceService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return baseURL + `api/attendance/employee`;
  }

  markAsPresent(empCode: string, status) {
    return this.http
      .post(`${this.getUrl()}/${empCode}/update/status`, status)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  changeShiftTiming(empCode: string, status) {
    return this.http
      .post(`${this.getUrl()}/${empCode}/update/shift`, status)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
