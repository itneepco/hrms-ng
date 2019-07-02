export interface EmployeeGroup {
  id: number;
  emp_code: string;
  group_id: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeGroupForm {
  emp_code: string;
}

export interface EmployeeGroupDtl {
  id: number;
  group_id: number;
  employee: {
    emp_code: string
    first_name: string
    middle_name: string
    last_name: string
    designation: string
  }
}
