import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../auth/services/auth.service';
import { CL_CODE, EL_CODE, HPL_CODE, RH_CODE } from '../../../shared/models/global-codes';
import { LeaveJoiningReport } from '../../../shared/models/joining-report';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LedgerService } from '../../services/ledger.service';
import { LeaveStatus } from './../../models/leave-status';
import { JR_CALLBACKED, JR_PENDING, JR_RECOMMENDED, JR_SUBMITTED } from './../../models/leave.codes';
import { JoiningReportService } from './../../services/joining-report.service';
import { JoiningReportComponent } from './../joining-report/joining-report.component';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {
  leaveStatuses: LeaveStatus[] = [];
  pendingJoiningReports: LeaveJoiningReport[] = []
  processPendingJRs: LeaveJoiningReport[] = []

  //Earned leave and half pay leave code
  hpl_code = HPL_CODE
  el_code = EL_CODE

  //Joining letter status code
  jr_pending = JR_PENDING
  jr_submitted = JR_SUBMITTED
  jr_recommended = JR_RECOMMENDED
  jr_callbacked = JR_CALLBACKED

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
    this.fetchJoiningReports()
  }

  fetchJoiningReports() {
    this.joiningService.getMyPendingJR(this.authService.currentUser.emp_code)
      .subscribe(pending => {
        // console.log(pending)
        this.pendingJoiningReports = pending
      })  
    
    this.joiningService.getProcessPendingJR(this.authService.currentUser.emp_code)
      .subscribe(pending => {
        // console.log(pending)
        this.processPendingJRs = pending
      })  
  }

  openJoiningReport(pendingJR: LeaveJoiningReport) {
    let dialogRef = this.dialog.open(JoiningReportComponent, {
      panelClass: 'leave-detail-dialog',
      width: '650px',
      height: '550px',
      data: pendingJR
    })

    dialogRef.afterClosed().subscribe(data => {
      if(data) this.fetchJoiningReports()  
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

  getJRStatus(status: string) {
    return this.joiningService.getJRStatus(status)
  }
}
