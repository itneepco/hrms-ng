export interface LeaveType {
  id: number
  type: string
}

export interface LeaveStatus {
  cl: number
  rh: number
}

export interface Leave {
  purpose: string
  type: LeaveType
}