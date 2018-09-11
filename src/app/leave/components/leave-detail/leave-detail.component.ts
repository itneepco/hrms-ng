import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Leave } from '../../models/leave';
import { LeaveDay } from './../../models/leave';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {
  panelOpenState = false
  displayedColumns = ["position", "leave_type", "from_date", "to_date"]
  leaveDaySource: MatTableDataSource<LeaveDay>
  step: number = 0

  constructor(@Inject(MAT_DIALOG_DATA) public data: Leave) { }

  ngOnInit() {
    this.leaveDaySource = new MatTableDataSource(this.data.leaveDays)
  }

  setStep(index: number) {
    this.step = index;
  }

}
