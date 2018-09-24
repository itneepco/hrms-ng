import { Injectable } from '@angular/core';
import { CL_CODE, RH_CODE } from '../models/global-codes';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  constructor() { }

  getLeaveType(code: string) {
    switch(code) {
      case CL_CODE: {
        return "CL"
      }
      case RH_CODE: {
        return "RH"
      }
    }
  }
}
