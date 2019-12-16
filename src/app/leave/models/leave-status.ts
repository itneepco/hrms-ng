export interface LeaveStatus {
  balance: number;
  leave_type: string;
  leave_code: string;
}

export interface LeaveRegister {
  year: number;
  status: LeaveStatus[];
}
