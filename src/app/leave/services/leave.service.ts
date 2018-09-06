import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { LeaveApplication } from './../models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaveUrl = baseURL + "api/leave/apply"

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  applyLeave(leaveApplication: LeaveApplication) {
    console.log(leaveApplication)
    return this.http.post(this.leaveUrl, leaveApplication)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
  
}
