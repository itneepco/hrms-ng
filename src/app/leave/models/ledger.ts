import { LeaveType } from './leave';

export interface LeaveLedger {
  id: number
  emp_code: string
  cal_year: string
  db_cr_flag: string
  no_of_days: number
  leaveType: LeaveType
  remarks: string
}

