import { Injectable } from '@angular/core';

import { CL_CODE, EL_CODE, HD_CL_CODE, HPL_CODE, RH_CODE } from '../../shared/models/global-codes';
import { LeaveDetail } from './../../shared/models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  constructor() { }

  getLeaveType(code: string) {
    switch(code) {
      case CL_CODE: {
        return "Casual Leave"
      }
      case RH_CODE: {
        return "Restricted Holiday"
      }
      case EL_CODE: {
        return "Earned Leave"
      }
      case HPL_CODE: {
        return "Half Pay Leave"
      }
      case HD_CL_CODE: {
        return "Half Day CL"
      }
    }
  }

  isEarnedLeave(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == EL_CODE)
    return el_type ? true : false  
  }

  isHalfPayLeave(leaves: LeaveDetail[]): boolean {
    let ml_type = leaves.find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    return ml_type ? true : false  
  }

  isCasualLeave(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == CL_CODE)
    return el_type ? true : false  
  }

  isRestrictedHoliday(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == RH_CODE)
    return el_type ? true : false  
  }

  isHalfDayCl(leaves: LeaveDetail[]): boolean {
    let el_type = leaves.find(leaveDetail => leaveDetail.leave_type == HD_CL_CODE)
    return el_type ? true : false  
  }
}
