import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { LeaveAppForm } from './../models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaveUrl = baseURL + "api/leave/apply/"

  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService) { }

  applyLeave(leaveApplication: LeaveAppForm): Observable<any> {
    return this.http.post(this.leaveUrl, leaveApplication)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getLeaves(emp_code: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(this.leaveUrl + `employee/${emp_code}` +  "?pageIndex=" + 
      pageIndex + "&pageSize=" + pageSize)
        .pipe(
          catchError(err => this.handler.handleError(err))
        )
  }
  
}
