import { Component, OnInit, ViewChild } from '@angular/core';
import { AbsenteeStatementService } from 'src/app/attendance/services/absentee-statement.service';
import { MatTableDataSource } from '@angular/material/table';
import { DateService } from 'src/app/attendance/services/date.service';
import { MatSort } from '@angular/material/sort';
import { WageMonthService } from 'src/app/attendance/services/wage-month.service';
import { WageMonth } from 'src/app/attendance/models/wage-month';

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

  constructor(private absenteeStmtService: AbsenteeStatementService,
    private wageMonthService: WageMonthService) { }

  ngOnInit() {
    this.wageMonthService.getActiveWageMonth()
      .subscribe(wageMonth => this.activeWageMonth = wageMonth)

    this.absenteeStmtService.getAbsenteeStatement()
      .subscribe(result => {
        console.log(result)
        this.dataSource = new MatTableDataSource(result['data'])
        this.dataSource.sort = this.sort
      })
  }

  download() {

  }
}
