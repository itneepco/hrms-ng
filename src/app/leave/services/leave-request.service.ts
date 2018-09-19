import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LeaveProcess } from '../models/workflowAction';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  url = baseURL + "api/leave/request/"
  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getLeaveRequests(empCode: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + empCode + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }

  processLeave(process: LeaveProcess) {
    return this.http.post(this.url, process)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }
}
