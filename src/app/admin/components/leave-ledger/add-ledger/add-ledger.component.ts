import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { LedgerService } from "../../../../leave/services/ledger.service";
import { Employee } from "../../../../shared/models/employee";
import { LEAVE_TYPES } from "../../../../shared/models/global-codes";
import { LeaveType } from "../../../../shared/models/leave";
import { LeaveLedger } from "../../../../shared/models/ledger";

@Component({
  selector: "app-add-ledger",
  templateUrl: "./add-ledger.component.html",
  styleUrls: ["./add-ledger.component.scss"]
})
export class AddLedgerComponent implements OnInit, OnDestroy {
  ledgerForm: FormGroup;
  leaveTypes: LeaveType[];
  searchResult: Employee[] = [];
  dc_flag = [{ name: "Debit", value: "D" }, { name: "Credit", value: "C" }];
  ledger: LeaveLedger;
  empCodeSubs: Subscription;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private ledgerService: LedgerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLedgerComponent>
  ) {}

  ngOnInit() {
    this.leaveTypes = LEAVE_TYPES;

    if (this.data && this.data.ledger) {
      this.ledger = this.data.ledger;
    }

    this.ledgerForm = this.fb.group({
      emp_code: [
        this.ledger ? this.ledger.emp_code : "",
        [Validators.required, Validators.pattern("[0-9]{6}")]
      ],
      cal_year: [
        this.ledger ? this.ledger.cal_year : "",
        [Validators.required, Validators.pattern("[1-9][0-9]{3}")]
      ],
      db_cr_flag: [
        this.ledger ? this.ledger.db_cr_flag : "",
        Validators.required
      ],
      no_of_days: [
        this.ledger ? this.ledger.no_of_days : "",
        [Validators.required, Validators.pattern("[1-9][0-9]*")]
      ],
      leave_type: [
        this.ledger ? this.ledger.leave_type : "",
        Validators.required
      ],
      remarks: this.ledger ? this.ledger.remarks : "",
      is_manually_added: true
    });

    if (this.data && this.data.emp_code) {
      this.emp_code.setValue(this.data.emp_code);
    }
  }

  onSubmit() {
    if (this.ledgerForm.invalid) return;
    console.log(this.ledgerForm.value);

    this.isSubmitting = true;
    if (this.ledger) {
      this.ledgerService
        .updateLedger(this.ledger.id, this.ledgerForm.value)
        .subscribe(
          val => {
            this.isSubmitting = false;
            console.log(val);
            this.dialogRef.close(val);
          },
          error => {
            console.log(error);
            this.isSubmitting = false;
          }
        );
    } else {
      this.ledgerService.addLedger(this.ledgerForm.value).subscribe(
        val => {
          this.isSubmitting = false;
          console.log(val);
          this.dialogRef.close(val);
        },
        error => {
          console.log(error);
          this.isSubmitting = false;
        }
      );
    }
  }

  getFullName(item) {
    return `${item.first_name} ${item.middle_name} ${item.last_name}, ${
      item.designation
    }`;
  }

  get emp_code() {
    return this.ledgerForm.get("emp_code");
  }

  get cal_year() {
    return this.ledgerForm.get("cal_year");
  }

  get db_cr_flag() {
    return this.ledgerForm.get("db_cr_flag");
  }

  get no_of_days() {
    return this.ledgerForm.get("no_of_days");
  }

  get leave_type() {
    return this.ledgerForm.get("leave_type");
  }

  get remarks() {
    return this.ledgerForm.get("remarks");
  }

  ngOnDestroy() {
    // this.empCodeSubs.unsubscribe();
  }
}
