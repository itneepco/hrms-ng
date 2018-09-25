import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ACTION_TYPES, CL_CODE, RH_CODE } from '../../models/global-codes';
import { LeaveTypeService } from '../../services/leave-type.service';
import { WorkflowActionService } from '../../services/workflow-action.service';
import { LeaveDetail } from '../../models/leave';
import { AuthService } from '../../../auth/services/auth.service';
import { HierarchyService } from '../../../hierarchy/services/hierarchy.service';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {
  panelOpenState = false
  displayedColumns = ["position", "leave_type", "from_date", "to_date"]
  leaveDetailSource: MatTableDataSource<LeaveDetail>
  step: number = 0
  actionForm: FormGroup
  actions = ACTION_TYPES
  isTransaction;
  cl_code = CL_CODE
  rh_code = RH_CODE
  ctrlOfficers

  constructor(
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    public lTypeService: LeaveTypeService,
    private fb: FormBuilder,
    public wActionService: WorkflowActionService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data.leave.leaveDays)
    this.leaveDetailSource = new MatTableDataSource(this.data.leave.leaveDetails)
    this.initForm()
    this.isTransaction = this.data.isTransaction === 'true';

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe(ctrlOfficers => {
        this.ctrlOfficers = ctrlOfficers
      })
  }

  setStep(index: number) {
    this.step = index;
  }

  initForm() {
    this.actionForm = this.fb.group({
      action: ['', Validators.required],
      remarks: '',
      adressee_emp_code: ''
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return

    console.log(this.actionForm.value)
  }
}