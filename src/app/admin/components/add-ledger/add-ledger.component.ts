import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LedgerService } from '../../../leave/services/ledger.service';
import { LeaveLedger } from '../../../shared/models/ledger';
import { LeaveType } from '../../../shared/models/leave';
import { LEAVE_TYPES } from '../../../shared/models/global-codes';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.scss']
})
export class AddLedgerComponent implements OnInit {
  ledgerForm: FormGroup
  leaveTypes: LeaveType[]
  dc_flag = [
    {name: "Debit", value: "D"}, 
    {name: "Credit", value: "C"}
  ]
  ledger: LeaveLedger = {} as LeaveLedger

  constructor(private fb: FormBuilder,
    private ledgerService: LedgerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLedgerComponent>) { }

  ngOnInit() {
    this.leaveTypes = LEAVE_TYPES

    if(this.data && this.data.ledger) {
      this.ledger = this.data.ledger
    }
    
    console.log(this.ledger)  

    this.ledgerForm = this.fb.group({
      emp_code: [this.ledger.emp_code, [Validators.required, Validators.pattern('[0-9]{6}')]],
      cal_year: [this.ledger.cal_year, [Validators.required, Validators.pattern('[1-9][0-9]{3}')]],
      db_cr_flag: [this.ledger.db_cr_flag, Validators.required],
      no_of_days: [this.ledger.no_of_days, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      leave_type: [this.ledger.leave_type ? this.ledger.leave_type : '', Validators.required],
      remarks: this.ledger.remarks
    })
  }

  onSubmit() {
    if(this.ledgerForm.invalid) return

    if(this.ledger.id) {
      this.ledgerService.updateLedger(this.ledger.id, this.ledgerForm.value)
        .subscribe((val) => {
          console.log(val)
          this.dialogRef.close({ edit: val })
        })
    }
    else {
      this.ledgerService.addLedger(this.ledgerForm.value)
        .subscribe((val) => {
          console.log(val)
          this.dialogRef.close({ add: val })
        })
    }
  }

  get emp_code() {
    return this.ledgerForm.get('emp_code')
  }

  get cal_year() {
    return this.ledgerForm.get('cal_year')
  }

  get db_cr_flag() {
    return this.ledgerForm.get('db_cr_flag')
  }

  get no_of_days() {
    return this.ledgerForm.get('no_of_days')
  }

  get leave_type() {
    return this.ledgerForm.get('leave_type')
  }

  get remarks() {
    return this.ledgerForm.get('remarks')
  }
}