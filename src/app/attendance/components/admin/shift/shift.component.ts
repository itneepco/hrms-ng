import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Shift } from './../../../models/shift';
import { ShiftService } from './../../../services/shift.service';
import { ShiftFormComponent } from './shift-form/shift-form.component';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  displayedColumns = [
    "position",
    "name",
    "in_time_start",
    "in_time_end",
    "out_time_start",
    "out_time_end",
    "late_time",
    "half_time",
    "is_night_shift",
    "actions"
  ];

  dataSource: MatTableDataSource<Shift>;

  constructor(private location: Location,
    private shiftService: ShiftService,
    private auth: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.shiftService.getShifts(this.auth.currentUser.project).subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource<Shift>(data);
    })
  }

  onEdit(shift: Shift) {

  }

  onRemove(shift: Shift) {

  }

  goBack() {
    this.location.back();
  }

  onAddShift() {
    this.dialog.open(ShiftFormComponent, {
      width: '550px',
      height: '450px'
    })
  }
}
