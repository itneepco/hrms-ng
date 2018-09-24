export interface WorkFlowAction {
  code: string;
  name: string;
}

export interface LeaveProcess {
  action_id: number;
  leave_application_id: number;
  officer_emp_code: string;
}