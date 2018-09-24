import { Injectable } from '@angular/core';

import {
  LEAVE_APPLIED,
  LEAVE_APPROVED,
  LEAVE_NOT_RECOMMENDED,
  LEAVE_RECOMMENDED,
  LEAVE_REJECTED,
} from '../models/global-codes';

@Injectable({
  providedIn: 'root'
})
export class WorkflowActionService {

  constructor() { }

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
      case LEAVE_REJECTED: {
        return "Leave Rejected"
      }
    }
  }
}
