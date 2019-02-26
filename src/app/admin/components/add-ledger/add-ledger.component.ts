import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { LedgerService } from '../../../leave/services/ledger.service';
import { Employee } from '../../../shared/models/employee';
import { LEAVE_TYPES } from '../../../shared/models/global-codes';
import { LeaveType } from '../../../shared/models/leave';
import { LeaveLedger } from '../../../shared/models/ledger';
import { EmployeeService } from '../../../shared/services/employee.service';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.scss']
})
export class AddLedgerComponent implements OnInit, OnDestroy {
  ledgerForm: FormGroup
  leaveTypes: LeaveType[]
  searchResult: Employee[] = []
  dc_flag = [
    {name: "Debit", value: "D"}, 
    {name: "Credit", value: "C"}
  ]
  ledger: LeaveLedger = {} as LeaveLedger
  empCodeSubs: Subscription
  isSubmitting: boolean = false

  constructor(private fb: FormBuilder,
    private ledgerService: LedgerService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLedgerComponent>) { }

  ngOnInit() {
    this.leaveTypes = LEAVE_TYPES

    if(this.data && this.data.ledger) {
      this.ledger = this.data.ledger
    }
    
    this.ledgerForm = this.fb.group({
      emp_code: [this.ledger.emp_code, [Validators.required, Validators.pattern('[0-9]{6}')]],
      cal_year: [this.ledger.cal_year, [Validators.required, Validators.pattern('[1-9][0-9]{3}')]],
      db_cr_flag: [this.ledger.db_cr_flag, Validators.required],
      no_of_days: [this.ledger.no_of_days, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      leave_type: [this.ledger.leave_type ? this.ledger.leave_type : '', Validators.required],
      remarks: this.ledger.remarks
    })

    this.empCodeSubs = this.emp_code.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      if(!data) return
      if(data.length < 1) return
      
      this.employeeService.searchEmployee(data)
        .subscribe(response => {
          this.searchResult = response
        })
    })
    
  }

  onSubmit() {
    if(this.searchResult.length < 1) {
      this.emp_code.setErrors({"invalidEmpCode": true})
      return
    }

    if(this.ledgerForm.invalid) return
    console.log(this.ledgerForm.value)

    this.isSubmitting = true
    if(this.ledger.id) {
      this.ledgerService.updateLedger(this.ledger.id, this.ledgerForm.value)
      .subscribe((val) => {
        this.isSubmitting = false
        console.log(val)
        this.dialogRef.close({ edit: val })
      }, error => {
        console.log(error)
        this.isSubmitting = false
      })
    }
    else {
      this.ledgerService.addLedger(this.ledgerForm.value)
      .subscribe((val) => {
        this.isSubmitting = false
        console.log(val)
        this.dialogRef.close({ add: val })
      }, error => {
        console.log(error)
        this.isSubmitting = false
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

  ngOnDestroy() {
    this.empCodeSubs.unsubscribe()
  }
}