import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { baseURL } from './../../shared/config/baseUrl';
import { WageMonth, WageMonthForm } from './../models/wage-month';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WageMonthService {

  constructor(private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}/wage-month`
  }

  getActiveWageMonth(): Observable<WageMonth> {
    return this.http.get<WageMonth>(`${this.getUrl()}/active`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  initWageMonth(wageMonth: WageMonthForm) {
    return this.http.post(`${this.getUrl()}/init`, wageMonth)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
