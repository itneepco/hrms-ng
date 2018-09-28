import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from '../../../auth/services/auth.service';
import { TRANSACTION_PAGE } from '../../models/global-codes';
import { LeaveApplication } from '../../models/leave';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-transaction',
  templateUrl: './leave-transaction.component.html',
  styleUrls: ['./leave-transaction.component.scss']
})
export class LeaveTransactionComponent implements OnInit {
  emp_code: string
  dataSource: MatTableDataSource<LeaveApplication>
  isLoading: boolean
  errMsg: string
  transactionPage = TRANSACTION_PAGE

  // Pagination variables 
  dataLength = 10
  pageSize = 10
  pageIndex = 0

  constructor(private leaveService: LeaveService,
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
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.getLeaves()
  }

  refreshPage() {
    this.getLeaves()
  }
}
