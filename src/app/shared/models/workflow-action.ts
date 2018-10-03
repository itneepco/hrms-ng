export interface WorkFlowAction {
  code: string;
  name: string;
}

export interface LeaveProcess {
  leave_application_id: number
  workflow_action: string;
  officer_emp_code: string;
  remarks: string;
}