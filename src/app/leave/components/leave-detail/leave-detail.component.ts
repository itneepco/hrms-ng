import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ACTION_TYPES } from '../../models/global-codes';
import { LeaveDay } from '../../models/leave';
import { LeaveTypeService } from '../../services/leave-type.service';
import { WorkflowActionService } from '../../services/workflow-action.service';

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
  actions = ACTION_TYPES
  isTransaction;

  constructor(
    public lTypeService: LeaveTypeService,
    private fb: FormBuilder,
    public wActionService: WorkflowActionService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data.leave.leaveDays)
    this.leaveDaySource = new MatTableDataSource(this.data.leave.leaveDays)
    this.initForm()
    this.isTransaction = this.data.isTransaction === 'true';
  }

  setStep(index: number) {
    this.step = index;
  }

  initForm() {
    this.actionForm = this.fb.group({
      action: ['', Validators.required],
      remarks: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return

    console.log(this.actionForm.value)
  }
}