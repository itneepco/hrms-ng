import { LeaveType } from './ledger';

export interface Leave {
  purpose: string
  type: LeaveType
}