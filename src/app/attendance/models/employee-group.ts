export interface EmployeeGroup {
  id: number;
  emp_code: string;
  group_id: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeGroupDtl {
  group_id: number;
  employees: [
    {
      emp_code: string
      first_name: string
      last_name: string
      designation: string
    }
  ]
}
