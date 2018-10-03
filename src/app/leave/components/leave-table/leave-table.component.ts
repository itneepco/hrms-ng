import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {
  CL_CODE,
  EL_CODE,
  HPL_CODE,
  LEAVE_REQUEST_PAGE,
  RH_CODE,
  TRANSACTION_PAGE,
} from '../../../shared/models/global-codes';
import { LeaveApplication } from '../../../shared/models/leave';
import { PendingRequestService } from '../../services/pending-request.service';
import { WorkflowActionService } from '../../services/workflow-action.service';
import { LeaveDetailComponent } from './../leave-detail/leave-detail.component';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss']
})
export class LeaveTableComponent implements OnInit {
  displayedColumns: string[];
  transactionPage = TRANSACTION_PAGE

  @Input('dataSource') dataSource: MatTableDataSource<LeaveApplication>
  @Input('pageNo') pageNo;
  
  @Output() onAction = new EventEmitter()
  @Output() pageChange = new EventEmitter()

  // Pagination variables
  @Input('dataLength') dataLength 
  @Input('pageSize') pageSize
  @Input('pageIndex') pageIndex 

  constructor(private dialog: MatDialog,
      public wActionService: WorkflowActionService,
      private pendingReqService: PendingRequestService
    ) { }

  ngOnInit() {
    if(this.pageNo === TRANSACTION_PAGE) {
      this.displayedColumns = ["position", "type", "applied_on", "status", "with", "actions"]
    } else {
      this.displayedColumns = ["position", "type", "applied_on", "status", "name", "actions"]
    }
  }  

  onShow(leaveApplication: LeaveApplication, index: number) {
    let dialogRef = this.dialog.open(LeaveDetailComponent, {
      height: '550px',
      width: '700px',
      data: { 
        leave: leaveApplication,
        pageNo: this.pageNo
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return
      
      if(this.pageNo === LEAVE_REQUEST_PAGE) {
        this.pendingReqService.changeState()
        let temp = this.dataSource.data
        temp.splice(index, 1)
        this.dataSource.data = temp
      }
      else {
        this.pendingReqService.changeState()
        this.onAction.emit()
      }
    })
  }

  changePage(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent)
  }

  getLeaveType(leaveApplication: LeaveApplication) {
    let el_type = leaveApplication.leaveDetails.find(leaveDetail => leaveDetail.leave_type == EL_CODE)
    if(el_type) return "EL"

    let hpl_type = leaveApplication.leaveDetails.find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    if(hpl_type) return "ML/HL"

    let cl_rh_type = leaveApplication.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == CL_CODE || leaveDetail.leave_type == RH_CODE)
    return "CL/RH"
  }
}
