import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";
import { baseURL } from "src/app/shared/config/baseUrl";
import { ErrorHandlerService } from "src/app/shared/services/error-handler.service";

import { Shift } from "../models/shift";

@Injectable({
  providedIn: "root"
})
export class ShiftService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getShifts(): Observable<Shift[]> {
    return this.http
      .get<Shift[]>(`${this.getUrl()}/shifts`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getGeneralPunchings(): Observable<Shift[]> {
    return this.getShifts().pipe(
      map(shifts => shifts.filter(shift => shift.is_general))
    );
  }

  getShiftPunchings(): Observable<Shift[]> {
    return this.getShifts().pipe(
      map(shifts => shifts.filter(shift => !shift.is_general))
    );
  }

  addShift(shift: Shift) {
    return this.http
      .post(`${this.getUrl()}/shifts`, shift)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editShift(id: number, shift: Shift) {
    return this.http
      .put(`${this.getUrl()}/shifts/${id}`, shift)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteShift(id: number) {
    return this.http
      .delete(`${this.getUrl()}/shifts/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getShift(id: number) {
    return this.http
      .get<Shift>(`${this.getUrl()}/shifts/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  isNightShift(val: boolean) {
    if (val) {
      return "YES";
    } else {
      return "NO";
    }
  }
}
