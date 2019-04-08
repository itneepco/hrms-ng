import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from './../../shared/config/baseUrl';
import { CALENDAR_COLORS } from './../../shared/models/global-codes';
import { LeaveDetail } from './../../shared/models/leave';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { LeaveTypeService } from './../../shared/services/leave-type.service';
import { LeaveAppForm } from './../models/leave-app-form';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaveUrl = baseURL + "api/leave/apply/"

  constructor(private http: HttpClient, 
    private leaveType: LeaveTypeService,
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
  
  getEmployeeLeaves(emp_code: string) {
    return this.http.get(baseURL + `api/leave/detail/employee/${emp_code}`)
      .pipe(
        map(data => {
          let leaves: LeaveDetail[] = data['leaves']
          return leaves.map((leave: LeaveDetail) => {
            let calEvent = {
              title: `You have already applied for ${this.leaveType.getLeaveType(leave.leave_type)}`,
              start: new Date(leave.from_date),
              end: new Date(leave.to_date),
              color: CALENDAR_COLORS.green,
            }
            return calEvent
          })
        }),
        catchError(err => this.handler.handleError(err))
      )
  }
}
