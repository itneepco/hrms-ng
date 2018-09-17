import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from './../../../auth/services/auth.service';
import { LeaveDay } from './../../models/leave';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {
  panelOpenState = false
  displayedColumns = ["position", "leave_type", "from_date", "to_date"]
  leaveDaySource: MatTableDataSource<LeaveDay>
  step: number = 0
  actionForm: FormGroup
  actions = [{id:1, action_name:"Leave Approve"}, {id:2, action_name:"Leave Reject"}]

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.leaveDaySource = new MatTableDataSource(this.data.leave.leaveDays)
    this.initForm()
  }

  setStep(index: number) {
    this.step = index;
  }

  initForm() {
    this.actionForm = this.fb.group({
      action_id: ['', Validators.required],
      leave_application_id: [this.data.leave.id, Validators.required],
      officer_emp_code: [this.auth.currentUser.emp_code, Validators.required],
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return

    console.log(this.actionForm.value)
  }
}