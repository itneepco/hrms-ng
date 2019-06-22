export interface EMployeeWiseRoster {
  id: number;
  emp_code: string;
  day: Date;
  is_holiday: boolean;
  shift_id: number;
  in_time: string;
  out_time: string;
  attendance_status: number;
  modified_status: number;
  remarks: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
