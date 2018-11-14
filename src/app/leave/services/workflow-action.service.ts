import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { LeaveProcess } from '../../shared/models/workflow-action';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import {
  LEAVE_APPLIED,
  LEAVE_APPROVED,
  LEAVE_CALLBACKED,
  LEAVE_CANCELLED,
  LEAVE_NOT_RECOMMENDED,
  LEAVE_RECOMMENDED,
} from '../models/leave.codes';
import {
  LEAVE_CANCEL_CALLBACKED,
  LEAVE_CANCEL_INITIATION,
  LEAVE_CANCEL_NOT_RECOMMENDED,
  LEAVE_CANCEL_RECOMMENDED,
} from './../models/leave.codes';

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
        return "Leave Recommended"
      }
      case LEAVE_NOT_RECOMMENDED: {
        return "Leave Not Recommended"
      }
      case LEAVE_CALLBACKED: {
        return "Leave Callbacked"
      }
      case LEAVE_CANCELLED: {
        return "Leave Cancelled"
      }
      case LEAVE_CANCEL_INITIATION: {
        return "Leave Cancel Initialized"
      }
      case LEAVE_CANCEL_NOT_RECOMMENDED: {
        return "Leave Cancel Not Recommended"
      }
      case LEAVE_CANCEL_RECOMMENDED: {
        return "Leave Cancel Recommended"
      }
      case LEAVE_CANCEL_CALLBACKED: {
        return "Leave Cancel Callbacked"
      }
    }
  }

  processLeave(leaveProcess: LeaveProcess) {
    return this.http.post(this.workflowUrl + leaveProcess.leave_application_id + '/actions', leaveProcess)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
