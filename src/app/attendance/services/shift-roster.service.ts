import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { AuthService } from '../../auth/services/auth.service';
import { ShiftRoster } from '../models/shift-roster';

@Injectable({
  providedIn: "root"
})
export class ShiftRosterService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) { }

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getShiftRoster(
    from_date: string,
    to_date: string
  ): Observable<ShiftRoster[]> {
    return this.http
      .get<ShiftRoster[]>(
        `${this.getUrl()}/shift-roster?from_date=${from_date}&to_date=${to_date}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addShiftRoster(roster: ShiftRoster): Observable<ShiftRoster[]> {
    return this.http
      .post<ShiftRoster[]>(`${this.getUrl()}/shift-roster`, roster)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  generateEmpWiseRoster(from_date: string, to_date: string) {
    return this.http.get(`${this.getUrl()}/employee-wise-roster?from_date=${from_date}&to_date=${to_date}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
