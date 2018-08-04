export interface LeaveType {
  id: number
  type: string
}

export interface LeaveLedger {
  id: number
  emp_code: string
  cal_year: string
  db_cr_flag: string
  no_of_days: number
  leave_type: LeaveType
  remarks: string
}

