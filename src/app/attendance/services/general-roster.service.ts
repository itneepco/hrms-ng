import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { GeneralRoster } from './../models/general-roster';

@Injectable({
  providedIn: "root"
})
export class GeneralRosterService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getGenRosters(): Observable<GeneralRoster[]> {
    return this.http
      .get<GeneralRoster[]>(`${this.getUrl()}/general-roster`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addGenRoster(workDay: GeneralRoster) {
    return this.http
      .post(`${this.getUrl()}/general-roster`, workDay)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editGenRoster(id: number, workDay: GeneralRoster) {
    return this.http
      .put(`${this.getUrl()}/general-roster/${id}`, workDay)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteGenRoster(id: number) {
    return this.http
      .delete(`${this.getUrl()}/general-roster/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getGenRoster(id: number) {
    return this.http
      .get<GeneralRoster>(`${this.getUrl()}/general-roster/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  generateEmpWiseRoster(from_date: string, to_date: string) {
    return this.http.get(`${this.getUrl()}/emp-wise-roster/general?from_date=${from_date}&to_date=${to_date}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
