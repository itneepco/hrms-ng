import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from '../../../auth/services/auth.service';
import { LeaveApplication } from '../../../shared/models/leave';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LEAVE_REQUEST_PAGE } from '../../../shared/models/global-codes';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  dataSource: MatTableDataSource<LeaveApplication>
  isLoading: boolean
  errMsg: string
  leaveRequestPage = LEAVE_REQUEST_PAGE

  // Pagination variables 
  dataLength = 10
  pageSize = 10
  pageIndex = 0

  constructor(private leaveRequest: LeaveRequestService,
    private auth: AuthService) {}

  ngOnInit() {
    this.getLeaves()
  }  
  
  getLeaves() {
    this.isLoading = true
    let emp_code = this.auth.currentUser.emp_code
    this.leaveRequest.getLeaveRequests(emp_code, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.dataLength = data.count
        this.dataSource = new MatTableDataSource<LeaveApplication>(data.rows)
        // console.log(data.rows)
        this.isLoading = false
      },
      errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      }
    ) 
  }

  changePage(pageEvent: PageEvent) {
    console.log(pageEvent)
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getLeaves()
  }
}
