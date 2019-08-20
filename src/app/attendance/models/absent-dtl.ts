import { LeaveType } from 'src/app/shared/models/leave';

export interface AbsentDetail {
  id: number;
  emp_code: string;
  from_date: Date;
  to_date: Date;
  leaveType: LeaveType;
  created_at: string;
  updated_at: string;
}
