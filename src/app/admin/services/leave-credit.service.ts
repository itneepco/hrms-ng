import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveCreditService {
  leaveCreditUrl = baseURL + 'api/leave/credit'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  annualCasualLeaveCredit(): Observable<any> {
    return this.http.get(`${this.leaveCreditUrl}/yearly/cl`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  annualRestrictedHolidayCredit(): Observable<any> {
    return this.http.get(`${this.leaveCreditUrl}/yearly/rh`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  halfYearlyEarnedLeaveCredit(): Observable<any> {
    return this.http.get(`${this.leaveCreditUrl}/half-yearly/el`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  halfYearlyHalfPayLeaveCredit(): Observable<any> {
    return this.http.get(`${this.leaveCreditUrl}/half-yearly/hpl`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  leaveYearEndProcessing(): Observable<any> {
    return this.http.get(`${this.leaveCreditUrl}/year-closing`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
