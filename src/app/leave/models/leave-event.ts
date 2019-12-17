import { LeaveStatus } from './leave-status';

export interface LeaveEvent {
  date: Date;
  status: LeaveStatus
}