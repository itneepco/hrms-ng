import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsentDetailService } from 'src/app/attendance/services/absent-detail.service';
import { LeaveTypeService } from 'src/app/shared/services/leave-type.service';

import { AbsentDetail } from './../../../../models/absent-dtl';

@Component({
  selector: "app-absent-dtl-form",
  templateUrl: "./absent-dtl-form.component.html",
  styleUrls: ["./absent-dtl-form.component.scss"]
})
export class AbsentDtlFormComponent implements OnInit {
  absentForm: FormGroup;
  isSubmitting = false;
  leaveTypes = [];
  empCode: string;
  absentDetail: AbsentDetail;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private absentService: AbsentDetailService,
    private leaveTypeService: LeaveTypeService,
    public dialogRef: MatDialogRef<AbsentDtlFormComponent>
  ) {}

  ngOnInit() {
    this.empCode = this.data.emp_code;
    this.absentDetail = this.data.absent_detail;

    this.leaveTypeService.getAllLeaveTypes().subscribe(leaveTypes => {
      this.leaveTypes = leaveTypes;
    });

    this.initForm();
  }

  initForm() {
    this.absentForm = this.fb.group({
      emp_code: [this.empCode],
      from_date: ["", Validators.required],
      to_date: ["", Validators.required],
      leave_type_id: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.absentForm.invalid) return;

    this.isSubmitting = true;
    if (this.absentDetail && this.absentDetail.id) {
      this.absentService
        .editAbsentDtl(
          this.absentDetail.emp_code,
          this.absentDetail.id,
          this.absentForm.value
        )
        .subscribe(
          data => {
            this.isSubmitting = false;
            this.dialogRef.close(data);
          },
          error => (this.isSubmitting = false)
        );
    } else {
      this.absentService
        .addAbsentDtl(this.empCode, this.absentForm.value)
        .subscribe(
          data => {
            this.isSubmitting = false;
            this.dialogRef.close(data);
          },
          error => (this.isSubmitting = false)
        );
    }
  }

  get from_date() {
    return this.absentForm.get("from_date");
  }

  get to_date() {
    return this.absentForm.get("to_date");
  }

  get leave_type_id() {
    return this.absentForm.get("leave_type_id");
  }
}
