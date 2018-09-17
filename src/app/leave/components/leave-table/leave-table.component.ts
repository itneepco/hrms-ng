import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ApplicationHistory, LeaveApplication } from './../../models/leave';
import { LeaveDetailComponent } from './../leave-detail/leave-detail.component';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss']
})
export class LeaveTableComponent implements OnInit {
  displayedColumns: string[];

  @Input('dataSource') dataSource: MatTableDataSource<LeaveApplication>
  @Input('isTransaction') isTransaction: boolean;

  @Output() pageChange = new EventEmitter()

  // Pagination variables
  @Input('dataLength') dataLength 
  @Input('pageSize') pageSize
  @Input('pageIndex') pageIndex 

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if(this.isTransaction === true) {
      this.displayedColumns = ["position", "purpose", "applied_on", "status", "with", "actions"]
      console.log("Im here")
    } else {
      this.displayedColumns = ["position", "purpose", "applied_on", "status", "name", "actions"]
    }
    console.log(this.isTransaction)
  }  

  onShow(leaveApplication: LeaveApplication) {
    this.dialog.open(LeaveDetailComponent, {
      height: '550px',
      width: '700px',
      data: { 
        leave: leaveApplication,
        isTransaction: this.isTransaction
      }
    })
  }

  changePage(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent)
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
