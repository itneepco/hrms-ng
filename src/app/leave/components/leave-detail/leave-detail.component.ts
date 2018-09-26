import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ACTION_TYPES, CL_CODE, RH_CODE, LEAVE_RECOMMENDED } from '../../models/global-codes';
import { LeaveTypeService } from '../../services/leave-type.service';
import { WorkflowActionService } from '../../services/workflow-action.service';
import { LeaveDetail } from '../../models/leave';
import { AuthService } from '../../../auth/services/auth.service';
import { HierarchyService } from '../../../hierarchy/services/hierarchy.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  leave_recommended = LEAVE_RECOMMENDED

  constructor(
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    public lTypeService: LeaveTypeService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    public wActionService: WorkflowActionService,
    public dialogRef: MatDialogRef<LeaveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.leaveDetailSource = new MatTableDataSource(this.data.leave.leaveDetails)
    this.initForm()
    this.isTransaction = this.data.isTransaction;

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
      workflow_action: ['', Validators.required],
      remarks: '',
      officer_emp_code: '',
      leave_application_id: this.data.leave.id
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return

    this.wActionService.processLeave(this.actionForm.value)
      .subscribe((result) =>  {
        this.dialogRef.close("processed")
        this.snackbar.open("Successfully processed the leave request", "Dismiss", {
          duration: 1600
        }) 
      })  
  }

  get officer_emp_code() {
    return this.actionForm.get('officer_emp_code')
  }

  get workflow_action() {
    return this.actionForm.get('workflow_action')
  }
}