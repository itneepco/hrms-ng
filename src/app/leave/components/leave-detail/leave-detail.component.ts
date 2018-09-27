import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from '../../../auth/services/auth.service';
import { HierarchyService } from '../../../hierarchy/services/hierarchy.service';
import {
  CALLBACK_ACTION_TYPES,
  CL_CODE,
  LEAVE_APPROVED,
  LEAVE_PROCESSED_PAGE,
  LEAVE_RECOMMENDED,
  LEAVE_REQUEST_PAGE,
  PROCESS_ACTION_TYPES,
  RH_CODE,
  TRANSACTION_PAGE,
  LEAVE_CALLBACKED,
} from '../../models/global-codes';
import { LeaveDetail } from '../../models/leave';
import { LeaveTypeService } from '../../services/leave-type.service';
import { WorkflowActionService } from '../../services/workflow-action.service';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {
  panelOpenState = false
  displayedColumns = ["position", "leave_type", "station_leave", "from_date", "to_date"]
  leaveDetailSource: MatTableDataSource<LeaveDetail>
  step: number = 0
  actionForm: FormGroup
  actions = []
  ctrlOfficers = []

  //GLobal codes
  cl_code = CL_CODE
  rh_code = RH_CODE
  leave_recommended_code = LEAVE_RECOMMENDED
  leave_approved_code = LEAVE_APPROVED
  transactionPage = TRANSACTION_PAGE
  leaveProcessedPage = LEAVE_PROCESSED_PAGE
  leave_callback_code = LEAVE_CALLBACKED

  constructor(
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    public lTypeService: LeaveTypeService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public wActionService: WorkflowActionService,
    public dialogRef: MatDialogRef<LeaveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.leaveDetailSource = new MatTableDataSource(this.data.leave.leaveDetails)
    // console.log(this.data)
    this.initForm()

    if(this.data.pageNo == LEAVE_REQUEST_PAGE) {
      this.actions = PROCESS_ACTION_TYPES
    }
    else {
      this.actions = CALLBACK_ACTION_TYPES
    }

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe((ctrlOfficers: any[]) => {
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
      officer_emp_code: this.data.pageNo == this.transactionPage ? null : this.authService.currentUser.emp_code,
      addressee_emp_code: '',
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

  get addressee_emp_code() {
    return this.actionForm.get('addressee_emp_code')
  }

  get workflow_action() {
    return this.actionForm.get('workflow_action')
  }
}