import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { LeaveApplication } from '../../models/leave';
import { Leave, ApplicationHistory } from './../../models/leave';
import { LeaveService } from './../../services/leave.service';

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

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.getLeaves()
  }  
  
  getLeaves() {
    this.isLoading = true
    this.leaveService.getLeaves(this.pageIndex, this.pageSize).subscribe((leaves: Leave[]) => {
      this.dataSource = new MatTableDataSource(leaves)
      this.isLoading = false
    },
    errMsg => {
      this.errMsg = errMsg
      this.isLoading = false
    }) 
  }
  
  onView(leaveApplication: LeaveApplication) {

  }

  onEdit(leaveApplication: LeaveApplication) {

  } 
  
  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getLeaves()
  }
  
  getLeaveStatus(history: ApplicationHistory[]) {
    let lastItem = history[history.length-1]
    
    if(lastItem) {
      return lastItem.workflowAction.action_name
    }
    return null;
  }

  getOfficerName(history: ApplicationHistory[]) {
    let lastItem = history[history.length-1]
    
    if(lastItem) {
      return lastItem.officer.first_name + " " + lastItem.officer.last_name 
    }
    return null;
  }

}
