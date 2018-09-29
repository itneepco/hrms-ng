import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  url = baseURL + "api/leave/request/"
  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getLeaveRequests(empCode: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + `officer/${empCode}` + "?pageIndex=" + 
      pageIndex + "&pageSize=" + pageSize)
        .pipe(
          catchError(this.errorHandler.handleError)
        )
  }

  getProcessedRequests(empCode: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + `officer/${empCode}/processed` + "?pageIndex=" + 
      pageIndex + "&pageSize=" + pageSize)
        .pipe(
          catchError(this.errorHandler.handleError)
        )
  }

  getPendingRequestCount(empCode: string) {
    return this.http.get(this.url + `officer/${empCode}/count`)
      .pipe(
        catchError(err => this.errorHandler.handleError(err))
      )
  }
}
