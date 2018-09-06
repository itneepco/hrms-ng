export interface LeaveType {
  id: number
  type: string
}

export interface LeaveStatus {
  cl: number
  rh: number
}

export interface LeaveDay {
  from_date: Date;
  to_date: Date;
  leave_type_id: number;
}

interface ApplicationFormat {
  id: number;
  emp_code: string;
  purpose: string;
  address: string;
  contact_no: string;
  leaveDays: LeaveDay[];
}

export interface ApplicationHistory {
  id: number;
  officer: {
    emp_code: string;
    first_name: string;
    last_name: string;
  },
  workflowAction: {
    id: number,
    action_name: string
  },
  updated_at: Date
}

export interface LeaveApplication extends ApplicationFormat {
  officer_emp_code: string;
}

export interface Leave extends ApplicationFormat {
  history: ApplicationHistory[]
}

