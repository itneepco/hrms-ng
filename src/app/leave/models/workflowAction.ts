export interface WorkFlowAction {
  id: number;
  action_name: string;
}

export interface LeaveProcess {
  action_id: number;
  leave_application_id: number;
  officer_emp_code: string;
}