import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { WorkflowActionService } from '../../services/workflow-action.service';
import { LeaveApplication } from './../../models/leave';
import { LeaveDetailComponent } from './../leave-detail/leave-detail.component';
import { LeaveTypeService } from '../../services/leave-type.service';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.scss']
})
export class LeaveTableComponent implements OnInit {
  displayedColumns: string[];

  @Input('dataSource') dataSource: MatTableDataSource<LeaveApplication>
  @Input('isTransaction') isTransaction;

  @Output() pageChange = new EventEmitter()

  // Pagination variables
  @Input('dataLength') dataLength 
  @Input('pageSize') pageSize
  @Input('pageIndex') pageIndex 

  constructor(private dialog: MatDialog,
      public wActionService: WorkflowActionService,
    ) { }

  ngOnInit() {
    this.isTransaction = this.isTransaction === 'true';
    if(this.isTransaction === true) {
      this.displayedColumns = ["position", "purpose", "applied_on", "status", "with", "actions"]
    } else {
      this.displayedColumns = ["position", "purpose", "applied_on", "status", "name", "actions"]
    }
  }  

  onShow(leaveApplication: LeaveApplication, index: number) {
    let dialogRef = this.dialog.open(LeaveDetailComponent, {
      height: '550px',
      width: '700px',
      data: { 
        leave: leaveApplication,
        isTransaction: this.isTransaction
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return
      console.log("hello", index)
      this.dataSource.data = this.dataSource.data.splice(index, 1)
    })
  }

  changePage(pageEvent: PageEvent) {
    this.pageChange.emit(pageEvent)
  }
}
