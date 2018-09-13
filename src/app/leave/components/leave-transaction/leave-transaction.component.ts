import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from '../../../auth/services/auth.service';
import { ApplicationHistory, Leave, LeaveApplication } from '../../models/leave';
import { LeaveService } from '../../services/leave.service';
import { LeaveDetailComponent } from './../leave-detail/leave-detail.component';

@Component({
  selector: 'app-leave-transaction',
  templateUrl: './leave-transaction.component.html',
  styleUrls: ['./leave-transaction.component.css']
})
export class LeaveTransactionComponent implements OnInit {

  emp_code: string
  displayedColumns = ["position", "purpose", "applied_on", "status", "with", "actions"]
  dataSource: MatTableDataSource<Leave>
  isLoading: boolean
  errMsg: string

  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(private leaveService: LeaveService, 
    private dialog: MatDialog,
    private auth: AuthService) {}

  ngOnInit() {
    this.getLeaves()
  }  
  
  getLeaves() {
    this.isLoading = true
    let emp_code = this.auth.currentUser.emp_code
    this.leaveService.getLeaves(emp_code, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.dataLength = data.count
        this.dataSource = new MatTableDataSource<Leave>(data.rows)
        // this.dataSource = new MatTableDataSource(leaves)
        this.isLoading = false
      },
      errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      }
    ) 
  }
  
  onShow(leaveApplication: LeaveApplication) {
    this.dialog.open(LeaveDetailComponent, {
      height: '500px',
      width: '700px',
      data: leaveApplication
    })
  }
  
  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getLeaves()
  }
  
  getLeaveStatus(history: ApplicationHistory[]) {
    let lastItem = history.filter(el => el.isCurrent == true)[0]

    if(lastItem) {
      return lastItem.workflowAction.action_name
    }
    return null
  }

  getOfficerName(history: ApplicationHistory[]) {
    let lastItem = history[history.length-1]
    
    if(lastItem) {
      return lastItem.officer.first_name + " " + lastItem.officer.last_name 
    }
    return null
  }

}
