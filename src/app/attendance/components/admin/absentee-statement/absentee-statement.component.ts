import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WageMonth } from 'src/app/attendance/models/wage-month';
import { AbsenteeStatementService } from 'src/app/attendance/services/absentee-statement.service';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-absentee-statement',
  templateUrl: './absentee-statement.component.html',
  styleUrls: ['./absentee-statement.component.scss']
})
export class AbsenteeStatementComponent implements OnInit {
  displayedColumns = [
    "position",
    "name",
    "emp_code",
    "department",
    "absent_days",
    "half_days",
    "late_days",
    "absent_days_count",
  ];
  activeWageMonth: WageMonth;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private absenteeStmtService: AbsenteeStatementService,
    private wageMonthService: WageMonthService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth()
      .subscribe(wageMonth => this.activeWageMonth = wageMonth)

    this.absenteeStmtService.getAbsenteeStatement()
      .subscribe(result => {
        // console.log(result)
        this.dataSource = new MatTableDataSource(result['data'])
        this.dataSource.sort = this.sort
      })
  }

  download() {

  }

  processMonthEnd() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '200px',
      data: {
        message: "Are you sure you want to do month end?"
      }
    })

    dialogRef.afterClosed().subscribe(data => {
      if(!data) return;

      
    })
  }
}
