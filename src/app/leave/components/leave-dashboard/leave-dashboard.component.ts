import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../services/ledger.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LeaveStatus } from '../../models/leave';
import { CL_CODE, RH_CODE, EL_CODE, ML_CODE } from '../../models/global-codes';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {
  leaveStatuses: LeaveStatus[] = [];
  ml_code = ML_CODE
  el_code = EL_CODE

  constructor(private ledgerService: LedgerService,
    private authService: AuthService
    ){ }

  ngOnInit() {
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code, '2018')
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      }) 
  }

  get cl_balance() {
    let leave = this.leaveStatuses.find(status => status.leave_code == CL_CODE)
    if(!leave) return 0

    return leave.balance
  }

  get rh_balance() {
    let leave = this.leaveStatuses.find(status => status.leave_code == RH_CODE)
    if(!leave) return 0

    return leave.balance
  }

  get el_balance() {
    let leave = this.leaveStatuses.find(status => status.leave_code == EL_CODE)
    if(!leave) return 0

    return leave.balance
  }

  get ml_balance() {
    let leave = this.leaveStatuses.find(status => status.leave_code == ML_CODE)
    if(!leave) return 0

    return leave.balance
  }
}
