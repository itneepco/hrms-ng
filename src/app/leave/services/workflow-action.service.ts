import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import {
  LEAVE_APPLIED,
  LEAVE_APPROVED,
  LEAVE_CALLBACKED,
  LEAVE_NOT_RECOMMENDED,
  LEAVE_RECOMMENDED,
} from '../models/leave.codes';
import { LeaveProcess } from '../../shared/models/workflow-action';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowActionService {
  workflowUrl = baseURL + "api/leave/request/"
  
  constructor(private http: HttpClient,
    private handler: ErrorHandlerService) { }

  getWorkflowAction(code: string) {
    switch(code) {
      case LEAVE_APPLIED: {
        return "Leave Applied"
      }
      case LEAVE_APPROVED: {
        return "Leave Approved"
      }
      case LEAVE_RECOMMENDED: {
        return "Recommended"
      }
      case LEAVE_NOT_RECOMMENDED: {
        return "Not Recommended"
      }
      case LEAVE_CALLBACKED: {
        return "Callbacked"
      }
    }
  }

  processLeave(leaveProcess: LeaveProcess) {
    console.log(leaveProcess)
    return this.http.post(this.workflowUrl + leaveProcess.leave_application_id + '/actions', leaveProcess)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
