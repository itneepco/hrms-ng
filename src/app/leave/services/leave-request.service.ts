import { AuthService } from './../../auth/services/auth.service';
import { baseURL } from './../../shared/config/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { request } from '../models/request';
import { catchError } from 'rxjs/operators';
import { LeaveProcess } from '../models/workflowAction';

// import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  url = baseURL + "api/leave/requests/"
  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getLeaveRequests(empCode: string, pageIndex: number, pageSize: number) {
    // return this.http.get(this.url + empCode)
    //   .pipe(
    //     catchError(this.errorHandler.handleError)
    //   )
    return from([request]);
  }

  processLeave(process: LeaveProcess) {
    return this.http.post(this.url, process)
      .pipe(
        catchError(this.errorHandler.handleError)
      )
  }

}
