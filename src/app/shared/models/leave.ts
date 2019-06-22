import { JoiningReport } from './joining-report';

export interface LeaveType {
  id: number;
  code: string;
  name: string;
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
  time_office_status: boolean;
  remarks: string;
  prefix_from?: Date;
  prefix_to?: Date;
  suffix_from?: Date;
  suffix_to?: Date;
  created_at: string;
  joiningReport: JoiningReport;
  leaveDetails: LeaveDetail[];
  history: ApplicationHistory[]
}


