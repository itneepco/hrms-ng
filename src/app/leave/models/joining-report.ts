import { LeaveDetail } from './../../shared/models/leave';

export interface JoiningReport {
  id: number
  leave_application_id: number
  joining_date: Date
  session: string
  status: string
  comment: string
  addressee: string
}

export interface LeaveJoiningReport {
  id: number
  first_name: string
  last_name: string
  leaveDetails: LeaveDetail[]
  joining_report: JoiningReport
}