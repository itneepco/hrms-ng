import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { WageMonth } from "src/app/attendance/models/wage-month";
import { AbsenteeStatementService } from "src/app/attendance/services/absentee-statement.service";
import { WageMonthService } from "src/app/attendance/services/wage-month.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { DateService } from "src/app/shared/services/date.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-absentee-statement",
  templateUrl: "./absentee-statement.component.html",
  styleUrls: ["./absentee-statement.component.scss"]
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
    "absent_days_count"
  ];
  activeWageMonth: WageMonth;
  startDate: Date;
  endDate: Date;
  absenteeStatement = [];
  departments;
  selected = new FormControl();

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dateService: DateService,
    private absenteeStmtService: AbsenteeStatementService,
    private wageMonthService: WageMonthService
  ) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth().subscribe(wageMonth => {
      if (!wageMonth) return;

      this.activeWageMonth = wageMonth;
      this.startDate = this.activeWageMonth.from_date;
      this.endDate = this.activeWageMonth.to_date;

      this.fetchAbsenteeStmt();
    });
  }

  fetchAbsenteeStmt() {
    this.absenteeStmtService
      .getAbsenteeStatement(this.startDate, this.endDate)
      .subscribe(result => {
        this.absenteeStatement = result["data"];
        this.departments = [...new Set(this.absenteeStatement.map(item => item.department))]

        this.dataSource = new MatTableDataSource(this.absenteeStatement);
        this.dataSource.sort = this.sort;
      });
  }

  processMonthEnd() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "200px",
      data: {
        message: "Are you sure you want to do month end?"
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data) return;

      this.absenteeStmtService.processMonthEnd().subscribe(data => {
        console.log(data);
        this.snackbar.open(data.message, "Dismiss", {
          duration: 1600
        });
      });
    });
  }

  prevWageMonth() {
    this.dataSource = null;
    this.startDate = this.dateService.decreaseDateByMonth(this.startDate, 1);
    this.endDate = this.dateService.decreaseDateByMonth(this.endDate, 1);
    this.fetchAbsenteeStmt();
  }

  nextWageMonth() {
    this.dataSource = null;
    this.startDate = this.dateService.increaseDateByMonth(this.startDate, 1);
    this.endDate = this.dateService.increaseDateByMonth(this.endDate, 1);
    this.fetchAbsenteeStmt();
  }

  isActiveWageMonth() {
    return this.dateService.compareDates(
      this.activeWageMonth.from_date,
      this.startDate
    );
  }

  generatePDF() {
    this.absenteeStmtService.generatePDF(
      this.startDate,
      this.endDate,
      this.dataSource.data,
      this.selected.value
    );
  }

  onChangeDept() {
    const selectedDepartment = this.selected.value
    console.log(selectedDepartment)
    if (selectedDepartment == 'all') {
      this.dataSource.data = this.absenteeStatement
    } else {
      this.dataSource.data = this.absenteeStatement.filter(data => data.department == selectedDepartment)
    }
  }
}
