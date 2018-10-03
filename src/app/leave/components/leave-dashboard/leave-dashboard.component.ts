import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../services/ledger.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LeaveStatus } from '../../../shared/models/leave';
import { CL_CODE, RH_CODE, EL_CODE, HPL_CODE } from '../../../shared/models/global-codes';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {
  leaveStatuses: LeaveStatus[] = [];
  hpl_code = HPL_CODE
  el_code = EL_CODE

  constructor(private ledgerService: LedgerService,
    private authService: AuthService
    ){ }

  ngOnInit() {
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code)
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

  get hpl_balance() {
    let leave = this.leaveStatuses.find(status => status.leave_code == HPL_CODE)
    if(!leave) return 0

    return leave.balance
  }
}
