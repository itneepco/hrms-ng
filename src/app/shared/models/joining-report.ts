import { LeaveDetail } from './leave';

export interface JoiningReport {
  id: number
  leave_application_id: number
  joining_date: Date
  session: string
  status: string
  comment: string
  addressee: string
}

export interface LeaveJoiningReport {
  id: number;
  emp_code: string;
  first_name: string;
  last_name: string;
  purpose: string;
  address: string;
  contact_no: string;
  addressee: string;
  status: string;
  prefix_from?: Date;
  prefix_to?: Date;
  suffix_from?: Date;
  suffix_to?: Date;
  leaveDetails: LeaveDetail[]
  joiningReport: JoiningReport
}