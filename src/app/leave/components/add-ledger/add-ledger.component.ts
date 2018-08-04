import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { LeaveType } from '../../shared/ledger';
import { LeaveTypeService } from '../../services/leave-type.service';
import { LedgerService } from '../../services/ledger.service';

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

  constructor(private fb: FormBuilder,
    private leaveTypeService: LeaveTypeService, 
    private ledgerService: LedgerService,
    public dialogRef: MatDialogRef<AddLedgerComponent>) { }

  ngOnInit() {
    this.leaveTypeService.getLeaveTypes()
      .subscribe((leaveTypes: LeaveType[]) => this.leaveTypes = leaveTypes)

    this.ledgerForm = this.fb.group({
      emp_code: ["", [Validators.required, Validators.pattern('[0-9]{6}')]],
      cal_year: ["", [Validators.required, Validators.pattern('[1-9][0-9]{3}')]],
      db_cr_flag: ["", Validators.required],
      no_of_days: ["", Validators.required],
      leave_type_id: ["", Validators.required],
      remarks: ""
    })
  }

  onSubmit() {
    if(this.ledgerForm.invalid) return

    console.log(this.ledgerForm.value)
    this.ledgerService.addLedger(this.ledgerForm.value)
      .subscribe((val) => console.log(val))
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

  get leave_type_id() {
    return this.ledgerForm.get('leave_type_id')
  }

  get remarks() {
    return this.ledgerForm.get('remarks')
  }
}
