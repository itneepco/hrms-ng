export interface WorkFlowAction {
  code: string;
  name: string;
}

export interface LeaveProcess {
  workflow_action: string;
  addressee_emp_code: string;
  remarks: string;
}