import { Leave } from './../models/leave';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { request } from '../models/request';

// import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  url =""
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getLeaveRequests(empCode: string, pageIndex: number, pageSize: number) {
    // return this.http.get(this.url)
    //   .pipe(
    //     catchError(this.errorHandler.handleError)
    //   )
    return from([request]);
  }
}
