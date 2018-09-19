import { catchError } from 'rxjs/operators';
import { baseURL } from './../../shared/config/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  leaveTypeUrl = baseURL + 'api/leave/type'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getLeaveTypes() {
    return this.http.get(this.leaveTypeUrl)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
