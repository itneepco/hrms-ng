import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { LeaveLedger } from '../../models/ledger';
import { LedgerService } from '../../services/ledger.service';
import { AddLedgerComponent } from '../add-ledger/add-ledger.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './leave-ledger.component.html',
  styleUrls: ['./leave-ledger.component.scss']
})
export class LeaveLedgerComponent {
  emp_code: string
  displayedColumns = ["position", "emp_code", "cal_year", "db_cr_flag", "no_of_days", "leave_type_id", "actions"]
  dataSource: MatTableDataSource<LeaveLedger>
  isLoading: boolean
  errMsg: string
  
  // Pagination variables 
  dataLength = 0
  pageSize = 10
  pageIndex = 0

  constructor(private dialog: MatDialog, 
    private snackbar: MatSnackBar,
    private ledgerService: LedgerService) {}

  onSearch() {
    if(!this.emp_code) return 

    this.isLoading = true    
    this.ledgerService.searchEmployee(this.emp_code, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.dataLength = data['count']
        this.dataSource = new MatTableDataSource<LeaveLedger>(data['rows'])
        this.isLoading = false
      },
      errMsg => {
        this.errMsg = errMsg
        this.isLoading = false
      })
  }
  
  onAdd() {
    let dialogRef = this.dialog.open(AddLedgerComponent, {
      width: '550px',
      height: '450px',
    })

    dialogRef.afterClosed().subscribe(val => {
      if(val && val.add) {
        this.snackbar.open("Successfully created the leave ledger record", "Dismiss", {
          duration: 1600
        })
        this.dataSource = new MatTableDataSource<LeaveLedger>()
        this.dataSource.data.push(val.add)
        this.emp_code = ''
      }
    })
  }

  onEdit(ledger: LeaveLedger) {
    let dialogRef = this.dialog.open(AddLedgerComponent, {
      width: '550px',
      height: '450px',
      data: { ledger: ledger }
    })

    dialogRef.afterClosed().subscribe(val => {
      if(val && val.edit) {
        this.snackbar.open("Successfully edited the leave ledger record", "Dismiss", {
          duration: 1600
        })

        let index = this.dataSource.data.indexOf(ledger)
        let temp = this.dataSource.data
        temp.splice(index, 1)
        temp.unshift(val.edit)
        this.dataSource.data = temp
      }
    })
  }

  onRemove(ledger: LeaveLedger) {
    let retVal = confirm("Are you sure you want to delete?")
    if(retVal == true) { 
      this.ledgerService.deleteLedger(ledger.id)
      .subscribe(() => {
        let index = this.dataSource.data.indexOf(ledger)
        let temp = this.dataSource.data
        temp.splice(index, 1)
        this.dataSource.data = temp
        this.snackbar.open("Successfully deleted the leave ledger record", "Dismiss", {
          duration: 1600
        })
      })
    }
  } 
  
  changePage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize
    this.onSearch()
  } 
}
