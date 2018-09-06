export interface LeaveType {
  id: number
  type: string
}

export interface LeaveStatus {
  cl: number
  rh: number
}

export interface LeaveDay {
  from_date: Date;
  to_date: Date;
  leave_type_id: number;
}

export interface LeaveApplication {
  id: number;
  emp_code: string;
  purpose: string;
  address: string;
  contact_no: string;
  officer_emp_code: string;
  leaveDays: LeaveDay[];
}