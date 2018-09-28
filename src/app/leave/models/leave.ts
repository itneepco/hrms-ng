export interface LeaveType {
  code: string;
  name: string;
}

export interface LeaveStatus {
  balance: number;
  leave_type: string;
  leave_code: string;
}

export interface LeaveDetail {
  id: number;
  leave_type: string;
  from_date: string;
  to_date: string;
  staion_leave: boolean;
}

export interface ApplicationHistory {
  id: number;
  isCurrent: boolean;
  officer: {
    emp_code: string;
    first_name: string;
    last_name: string;
  },
  workflow_action: string,
  updated_at: string
}

export interface LeaveApplication {
  id: number;
  emp_code: string;
  first_name: string;
  last_name: string;
  purpose: string;
  address: string;
  contact_no: string;
  addressee: string;
  status: string;
  prefix_from?: string;
  prefix_to?: string;
  suffix_from?: string;
  suffix_to?: string;
  created_at: string;
  leaveDetails: LeaveDetail[];
  history: ApplicationHistory[]
}

export interface LeaveAppForm {
  id: number;
  emp_code: string;
  purpose: string;
  address: string;
  contact_no: string;
  officer_emp_code;
  prefix_from?: string;
  prefix_to?: string;
  suffix_from?: string;
  suffix_to?: string;
  leaveDays: {
    from_date: string;
    to_date: string;
    leave_type: string;
    station_leave: boolean
  }[]
}

