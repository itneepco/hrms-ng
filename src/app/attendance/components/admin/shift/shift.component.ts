import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { Shift } from './../../../models/shift';
import { ShiftService } from './../../../services/shift.service';
import { ShiftFormComponent } from './shift-form/shift-form.component';

@Component({
  selector: "app-shift",
  templateUrl: "./shift.component.html",
  styleUrls: ["./shift.component.scss"]
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
    "actions"
  ];

  dataSource: MatTableDataSource<Shift>;

  constructor(
    private location: Location,
    private shiftService: ShiftService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.shiftService.getShifts().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Shift>(data);
    });
  }

  onAddShift() {
    const dialogRef = this.dialog.open(ShiftFormComponent, {
      width: "600px",
      height: "550px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.snackbar.open("Successfully added the shift record", "Dismiss", {
        duration: 1600
      });
      const temp = this.dataSource.data;
      temp.unshift(result);
      this.dataSource.data = temp;
    });
  }

  onEdit(shift: Shift) {
    const dialogRef = this.dialog.open(ShiftFormComponent, {
      width: "600px",
      height: "550px",
      data: shift
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.snackbar.open("Successfully edited the shift record", "Dismiss", {
        duration: 1600
      });
      const index = this.dataSource.data.indexOf(shift);
      const temp = this.dataSource.data;
      temp[index] = result;
      this.dataSource.data = temp;
    });
  }

  onRemove(shift: Shift) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal != true) {
      return;
    }

    this.shiftService.deleteShift(shift.id).subscribe(
      () => {
        const temp = this.dataSource.data;
        const index = temp.indexOf(shift);
        temp.splice(index, 1);
        this.dataSource.data = temp;
        this.snackbar.open("Successfully deleted the shift record", "Dismiss", {
          duration: 1600
        });
      },
      error => {
        console.log(error);
        this.snackbar.open(
          "Cannot delete shift record. Its being referenced by other table",
          "Dismiss",
          {
            duration: 2500
          }
        );
      }
    );
  }

  goBack() {
    this.location.back();
  }

  isNightShift(val: boolean) {
    return this.shiftService.isNightShift(val);
  }
}
