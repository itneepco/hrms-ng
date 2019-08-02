export interface AbsentDetail {
  id: number;
  emp_code: string;
  from_date: Date;
  to_date: Date;
  leave_type_id: number;
  created_at: string;
  updated_at: string;
}


export interface LeaveType {
  id: number
  code: string
  description: string
  created_at: string;
  updated_at: string;
}
