import { JR_PENDING, JR_SUBMITTED, JR_RECOMMENDED, JR_ACCEPTED } from './../models/leave.codes';
import { JoiningReport } from '../../shared/models/joining-report';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class JoiningReportService {
  url = baseURL + "api/joining-report"

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getMyPendingJR(empCode: string): Observable<any> {
    return this.http.get(`${this.url}/employee/${empCode}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }

  updateJoiningReport(leaveId: number, joiningReport: JoiningReport) {
    return this.http.put(`${this.url}/leave-application/${leaveId}`, joiningReport)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }

  getProcessPendingJR(empCode: string): Observable<any> {
    return this.http.get(`${this.url}/pending/${empCode}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }

  getJRStatus(status: string) {
    switch(status) {
      case JR_PENDING: {
        return "Pending"
      }
      case JR_SUBMITTED: {
        return "Submitted"
      }
      case JR_RECOMMENDED: {
        return "Recommended"
      }
      case JR_ACCEPTED: {
        return " Accepted"
      }
    }
  }
}
