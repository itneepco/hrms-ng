import { LeaveJoiningReport } from './../../models/joining-report';
import { JoiningReportComponent } from './../joining-report/joining-report.component';
import { MatDialog } from '@angular/material/dialog';
import { JoiningReportService } from './../../services/joining-report.service';
import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../services/ledger.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LeaveStatus } from '../../../shared/models/leave';
import { CL_CODE, RH_CODE, EL_CODE, HPL_CODE } from '../../../shared/models/global-codes';
import { LeaveTypeService } from '../../services/leave-type.service';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {
  leaveStatuses: LeaveStatus[] = [];
  hpl_code = HPL_CODE
  el_code = EL_CODE
  pendingJoiningReports: LeaveJoiningReport[] = []

  constructor(private ledgerService: LedgerService,
    private authService: AuthService,
    private joiningService: JoiningReportService,
    private dialog: MatDialog,
    public leaveType: LeaveTypeService
  ){ }

  ngOnInit() {
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code)
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      }) 

    this.joiningService.getJoiningReport(this.authService.currentUser.emp_code)
      .subscribe(pending => {
        console.log(pending)
        this.pendingJoiningReports = pending
      })  
  }

  openJoiningReport(pendingJR: LeaveJoiningReport) {
    this.dialog.open(JoiningReportComponent, {
      width: '600px',
      height: '450px',
      data: pendingJR
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
