import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { LedgerService } from './../../services/ledger.service';
import { LeaveLedger } from './../../shared/ledger';
import { AddLedgerComponent } from './../add-ledger/add-ledger.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {
  emp_code: string;
  displayedColumns = ["position", "emp_code", "cal_year", "db_cr_flag", "no_of_days", "leave_type_id", "actions"]
  dataSource: MatTableDataSource<LeaveLedger>
  isLoading: boolean

  constructor(private dialog: MatDialog, private ledgerService: LedgerService) { }

  openDialog() {
    this.dialog.open(AddLedgerComponent, {
      width: '550px',
      height: '450px',
    })
  }

  onSearch() {
    if(!this.emp_code) return 

    this.isLoading = true
    this.ledgerService.searchEmployee(this.emp_code)
      .subscribe((ledgers: LeaveLedger[]) => {
        console.log(ledgers)
        this.dataSource = new MatTableDataSource<LeaveLedger>(ledgers)
        this.isLoading = false
      })
  }

  onEdit(ledger: LeaveLedger) {

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
      })
    }
  }
}
