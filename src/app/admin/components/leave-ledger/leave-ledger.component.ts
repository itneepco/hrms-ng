import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { LeaveTypeService } from "../../../shared/services/leave-type.service";
import { LedgerService } from "../../../leave/services/ledger.service";
import { LeaveLedger } from "../../../shared/models/ledger";
import { AddLedgerComponent } from "./add-ledger/add-ledger.component";
import { EmployeeService } from "./../../../shared/services/employee.service";
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: "app-ledger",
  templateUrl: "./leave-ledger.component.html",
  styleUrls: ["./leave-ledger.component.scss"]
})
export class LeaveLedgerComponent implements OnInit, OnDestroy {
  emp_code: FormControl;
  displayedColumns = [
    "position",
    "emp_code",
    "cal_year",
    "db_cr_flag",
    "no_of_days",
    "leave_type",
    "remarks",
    "actions"
  ];
  dataSource: MatTableDataSource<LeaveLedger>;
  isLoading: boolean;
  errMsg: string;
  empCodeSubs: Subscription;
  searchResult = [];

  // Pagination variables
  dataLength = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private employeeService: EmployeeService,
    public leaveTypeService: LeaveTypeService,
    private ledgerService: LedgerService
  ) {}

  ngOnInit() {
    this.emp_code = new FormControl("", Validators.required);

    this.empCodeSubs = this.emp_code.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (!data) {
          return;
        }
        if (data.length < 1) {
          return;
        }

        this.employeeService.searchEmployee(data).subscribe(response => {
          this.searchResult = response;
          console.log(this.searchResult);
        });
      });
  }

  onSearch() {
    this.errMsg = null;

    if (this.emp_code.invalid) return;
    if (this.searchResult.length < 1) {
      this.errMsg =
        "No such employee code exists in this office / project. Please try again!!";
      return;
    }

    this.isLoading = true;
    this.ledgerService
      .searchEmployee(this.emp_code.value, this.pageIndex, this.pageSize)
      .subscribe(
        data => {
          this.dataLength = data["count"];
          this.dataSource = new MatTableDataSource<LeaveLedger>(data["rows"]);
          this.isLoading = false;
          console.log(data["rows"])
        },
        errMsg => {
          this.errMsg = errMsg;
          this.isLoading = false;
        }
      );
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddLedgerComponent, {
      width: "550px",
      height: "450px",
      data: {
        emp_code: this.emp_code.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(
          "Successfully created the leave ledger record",
          "Dismiss",
          {
            duration: 1600
          }
        );
        const temp = this.dataSource.data;
        temp.unshift(result);
        this.dataSource.data = temp;
        this.emp_code.reset();
      }
    });
  }

  onEdit(ledger: LeaveLedger) {
    const dialogRef = this.dialog.open(AddLedgerComponent, {
      width: "550px",
      height: "450px",
      data: { ledger: ledger }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(
          "Successfully edited the leave ledger record",
          "Dismiss",
          {
            duration: 1600
          }
        );

        const index = this.dataSource.data.indexOf(ledger);
        const temp = this.dataSource.data;
        temp[index] = result;
        this.dataSource.data = temp;
      }
    });
  }

  onRemove(ledger: LeaveLedger) {
    const retVal = confirm("Are you sure you want to delete?");
    if (retVal === true) {
      this.ledgerService.deleteLedger(ledger.id).subscribe(() => {
        const index = this.dataSource.data.indexOf(ledger);
        const temp = this.dataSource.data;
        temp.splice(index, 1);
        this.dataSource.data = temp;
        this.snackbar.open(
          "Successfully deleted the leave ledger record",
          "Dismiss",
          {
            duration: 1600
          }
        );
      });
    }
  }

  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.onSearch();
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
