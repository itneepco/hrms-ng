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

  noOfCasualLeave(leaves: LeaveDetail[]) {
    return leaves.filter(leaveDetail => leaveDetail.leave_type == CL_CODE).length
  }

  noOfHalfDayCL(leaves: LeaveDetail[]) {
    return leaves.filter(leaveDetail => leaveDetail.leave_type == HD_CL_CODE).length
  }

  noOfRestrictedHoliday(leaves: LeaveDetail[]) {
    return leaves.filter(leaveDetail => leaveDetail.leave_type == RH_CODE).length
  }

  noOfEarnedLeave(leaves: LeaveDetail[]) {
    let leave = leaves[0]
    let to_date = new Date(leave.to_date)
    let from_date = new Date(leave.from_date)
    let no_of_el = ((to_date.valueOf() - from_date.valueOf()) / (60*60*24*1000)) + 1
    
    if(leave.leave_type == EL_CODE) {
      return no_of_el
    }
    
    return 0;
  }

  noOfHalfPayLeave(leaves: LeaveDetail[]) {
    let leave = leaves[0]
    let to_date = new Date(leave.to_date)
    let from_date = new Date(leave.from_date)
    let no_of_hpl = ((to_date.valueOf() - from_date.valueOf()) / (60*60*24*1000)) + 1

    if(leave.leave_type == HPL_CODE) {
      return no_of_hpl
    }
    
    return 0;
  }
}
