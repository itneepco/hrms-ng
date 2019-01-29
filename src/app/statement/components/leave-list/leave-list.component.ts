import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { LeaveTypeService } from '../../../shared/services/leave-type.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent {
  @Input('dataSource') dataSource: MatTableDataSource<any>;
  @Input('leaveTypeService') leaveType: LeaveTypeService;
  @Input('from_date') from_date: Date;
  @Input('to_date') to_date: Date

  displayedColumns = ["position", "leave_app_id", "emp_code", "name", "leave_type", "from_date", "to_date"]
}
