import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Shift } from '../models/shift';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return (
      baseURL +
      `api/attendance/project/${this.auth.currentUser.project}/employee-dashboard`
    );
  }

  getShiftTimings(): Observable<Shift[]> {
    return this.http
      .get<Shift[]>(`${this.getUrl()}/${this.auth.currentUser.emp_code}/punch-timings`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getLatePunchings(): Observable<Date[]> {
    return this.http
      .get<Date[]>(`${this.getUrl()}/${this.auth.currentUser.emp_code}/late-punchings`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getTodaysPunching(): Observable<Date[]> {
    return this.http
      .get<Date[]>(`${this.getUrl()}/${this.auth.currentUser.emp_code}/todays-punching`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
