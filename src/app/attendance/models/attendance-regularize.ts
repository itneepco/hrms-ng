import { PunchingRecord } from "./punching-rec";

export interface AttendRegForm {
  day: string;
  status: string;
  emp_code: string;
  addressee: string;
  isMutual: boolean;
  mutual_emp_code?: string;
  reason: string;
}

export interface RegularizeHistory {
  id: number;
  officer: {
    emp_code: string;
    full_name: string;
    designation: string;
  };
  workflow_action: string;
  remarks: string;
  updated_at: string;
}

export interface AttendRegApplication {
  id: number;
  day: string;
  status: string;
  applier: {
    emp_code: string;
    full_name: string;
    designation: string;
  };
  isMutual: boolean;
  applicationHistory: RegularizeHistory[];
  reason: string;

  // employee_attendance: {
  //   shift: {
  //     name: string,
  //     is_general: boolean
  //   };
  //   in_time: string;
  //   out_time: string;
  //   attendance_status: string;
  // }
  // employee_punchdata: [{
  //   punching_time: string;
  //   machine_no: string;
  // }];

  // mutual_employee: {
  //   emp_code: string;
  //   full_name: string;
  //   designation: string;
  // };
  // mutual_employee_attendance: {
  //   shift: {
  //     name: string,
  //     is_general: boolean
  //   };
  //   in_time: string;
  //   out_time: string;
  //   attendance_status: string;
  // }
  // mutual_employee_punchdata: [{
  //   punching_time: string;
  //   machine_no: string;
  // }];
}
