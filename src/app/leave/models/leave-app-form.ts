export interface LeaveAppForm {
  id: number;
  emp_code: string;
  purpose: string;
  address: string;
  contact_no: string;
  officer_emp_code;
  prefix_from?: string;
  prefix_to?: string;
  suffix_from?: string;
  suffix_to?: string;
  leaveDays: {
    from_date: string;
    to_date: string;
    leave_type: string;
    station_leave: boolean
  }[]
}