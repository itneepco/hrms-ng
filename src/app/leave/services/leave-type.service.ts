import { Injectable } from '@angular/core';

import { CL_CODE, EL_CODE, HD_CL_CODE, HPL_CODE, RH_CODE } from '../../shared/models/global-codes';

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
}
