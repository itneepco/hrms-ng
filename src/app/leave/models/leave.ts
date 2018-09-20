import { WorkFlowAction } from './workflowAction';

export interface LeaveType {
  id: number;
  ltype: string;
}

export interface LeaveStatus {
  balance: number;
  leave_type: string;
  leave_type_id: string;
}

export interface LeaveDay {
  id: number;
  leaveType: LeaveType;
  from_date: string;
  to_date: string;
}

export interface ApplicationHistory {
  id: number;
  isCurrent: boolean;
  officer: {
    emp_code: string;
    first_name: string;
    last_name: string;
  },
  workflowAction: WorkFlowAction,
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
  leaveDays: LeaveDay[];
  created_at: string;
  history: ApplicationHistory[]
}

export interface LeaveAppForm {
  id: number;
  emp_code: string;
  purpose: string;
  address: string;
  contact_no: string;
  officer_emp_code;
  leaveDays: {
    from_date: string;
    to_date: string;
    leave_type_id: number;
  }[]
}

