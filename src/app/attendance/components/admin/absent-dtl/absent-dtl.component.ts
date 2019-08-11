import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbsentDetailService } from 'src/app/attendance/services/absent-detail.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

import { AbsentDetail } from './../../../models/absent-dtl';
import { AbsentDtlFormComponent } from './absent-dtl-form/absent-dtl-form.component';


@Component({
  selector: "app-absent-dtl",
  templateUrl: "./absent-dtl.component.html",
  styleUrls: ["./absent-dtl.component.scss"]
})
export class AbsentDtlComponent implements OnInit {
  emp_code: FormControl;
  errMsg: string;
  empCodeSubs: Subscription;
  searchResult = [];
  isSearching = false;

  // Pagination variables
  dataLength = 0;
  pageSize = 15;
  pageIndex = 0;

  // data table
  displayedColumns = [
    "position",
    "leave_type",
    "from_date",
    "to_date",
    "actions"
  ];
  dataSource: MatTableDataSource<AbsentDetail>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private absentService: AbsentDetailService
  ) {}

  ngOnInit() {
    this.emp_code = new FormControl('', Validators.required);

    this.empCodeSubs = this.emp_code.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (!data) return;
        if (data.length < 1) return;

        this.employeeService.searchEmployee(data).subscribe(response => {
          this.searchResult = response;
        });
      });
  }

  onSearch() {
    this.errMsg = null;
    if (!this.emp_code) return;

    if (this.searchResult.length < 1) {
      this.errMsg =
        "No such employee code exists in this office / project. Please try again!!";
      return;
    }
    this.isSearching = true;
    this.absentService
      .getAbsentDtls(this.emp_code.value, this.pageIndex, this.pageSize)
      .subscribe(
        data => {
          console.log(data)
          this.dataLength = data["count"];
          this.dataSource = new MatTableDataSource<AbsentDetail>(data["rows"]);
          this.dataSource.sort = this.sort;
          this.isSearching = false;
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isSearching = false;
        }
      );
  }

  addAbsentDtl() {
    const dialogRef = this.dialog.open(AbsentDtlFormComponent, {
      width: "500px",
      height: "400px",
      data: {
        emp_code: this.emp_code.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.snackbar.open("Successfully added absent detail record", "Dismiss", {
        duration: 1600
      });
      this.dataSource.data.unshift(result);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  onDelete(absent: AbsentDetail) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal != true) return;

    this.absentService
      .deleteAbsentDtl(absent.emp_code, absent.id)
      .subscribe(() => {
        const index = this.dataSource.data.indexOf(absent);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
        this.snackbar.open(
          "Successfully deleted the absent detail record",
          "Dismiss",
          {
            duration: 1600
          }
        );
      });
  }

  onEdit(absentDtl: AbsentDetail) {
    const dialogRef = this.dialog.open(AbsentDtlFormComponent, {
      width: "500px",
      height: "400px",
      data: {
        emp_code: absentDtl.emp_code,
        absent_detail: absentDtl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.snackbar.open(
        "Successfully edited absent detail record",
        "Dismiss",
        {
          duration: 1600
        }
      );
      const index = this.dataSource.data.indexOf(absentDtl);
      this.dataSource.data[index] = result;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.designation
    }`;
  }

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe();
  }
}
