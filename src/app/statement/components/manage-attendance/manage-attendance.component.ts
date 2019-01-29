import { LeaveApplication } from './../../../shared/models/leave';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LeaveStatementService } from './../../services/leave-statement.service';

@Component({
  selector: 'app-manage-attendance',
  templateUrl: './manage-attendance.component.html',
  styleUrls: ['./manage-attendance.component.scss']
})
export class ManageAttendanceComponent {
  completedIds = []

  @Input('dataSource') dataSource: MatTableDataSource<any>;
  @Input('leaveTypeService') leaveType: LeaveTypeService;
  @Input('from_date') from_date: Date;
  @Input('to_date') to_date: Date;

  displayedColumns = ["mark", "position", "leave_app_id", "emp_code", "name", "leave_type", "from_date", "to_date"]

  constructor(private snackbar: MatSnackBar,
    private leaveStatement: LeaveStatementService) {}

  markComplete(event, id: number) {
    if(event.checked)
      this.completedIds.push(id)
    else {
      let index = this.completedIds.indexOf(id)
      if(index != -1) this.completedIds.splice(index, 1)
    }  
  }

  save() {
    console.log(this.completedIds)
    this.leaveStatement.markTimeOfficeCompleted(this.completedIds)
      .subscribe(() => {
        this.snackbar.open("Successfully marked as completed", "Dismiss", {
          duration: 1600
        })

        let filteredData = this.dataSource.data.filter((leave) => {
          return !this.completedIds.find(id => leave.id == id)
        })
        this.dataSource.data = filteredData
      })
  }
}
 