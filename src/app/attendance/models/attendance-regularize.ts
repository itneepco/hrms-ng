
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
    emp_name: string;
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
    emp_name: string;
    designation: string;
  };
  isMutual: boolean;
  mutual_emp_code: string;
  applicationHistory: RegularizeHistory[];
  reason: string;
}

export interface EmployeeAttendance {
  attendance: {
    shift: {
      name: string;
      is_general: boolean;
    };
    in_time: string;
    out_time: string;
    status: string;
  };
  punchings: {
    punching_time: string;
    machine_no: string;
  }[];
}

export interface MutualEmployeeAttendance {
  employee: {
    emp_code: string;
    full_name: string;
    designation: string;
  };
  attendance: {
    shift: {
      name: string,
      is_general: boolean
    };
    in_time: string;
    out_time: string;
    status: string;
  }
  punchings: {
    punching_time: string;
    machine_no: string;
  }[];
}
