export interface EmployeeWiseRoster {
  id: number;
  emp_code: string;
  day: Date;
  is_holiday: boolean;
  shift_id: number;
  in_time: string;
  out_time: string;
  attendance_status: string;
  modified_status: number;
  remarks: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceStatus {
  id: number;
  emp_code: string;
  day: Date;
  is_holiday: boolean;
  shift: {
    id: number,
    name: string,
    is_general: boolean
  };
  in_time: string;
  out_time: string;
  attendance_status: string;
  modified_status: number;
  remarks: string;
}
