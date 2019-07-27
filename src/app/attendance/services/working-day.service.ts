import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";

import { WorkingDay } from "./../models/working-day";

@Injectable({
  providedIn: "root"
})
export class WorkingDayService {
  // This service is used for marking saturday and sunday as working day

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getWorkingDays(): Observable<WorkingDay[]> {
    return this.http
      .get<WorkingDay[]>(`${this.getUrl()}/working-day`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addWorkingDay(workDay: WorkingDay): Observable<WorkingDay> {
    return this.http
      .post<WorkingDay>(`${this.getUrl()}/working-day`, workDay)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editWorkingDay(id: number, workDay: WorkingDay) {
    return this.http
      .put(`${this.getUrl()}/working-day/${id}`, workDay)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteWorkingDay(id: number) {
    return this.http
      .delete(`${this.getUrl()}/working-day/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getWorkingDay(id: number) {
    return this.http
      .get<WorkingDay>(`${this.getUrl()}/working-day/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
