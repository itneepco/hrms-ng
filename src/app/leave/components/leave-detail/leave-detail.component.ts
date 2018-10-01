import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { HierarchyService } from '../../../admin/services/hierarchy.service';
import { AuthService } from '../../../auth/services/auth.service';
import {
  CALLBACK_ACTION_TYPES,
  CL_CODE,
  EL_CODE,
  EL_ML_ACTION_TYPES,
  LEAVE_APPROVED,
  LEAVE_CALLBACKED,
  LEAVE_PROCESSED_PAGE,
  LEAVE_RECOMMENDED,
  LEAVE_REQUEST_PAGE,
  HPL_CODE,
  PROCESS_ACTION_TYPES,
  RH_CODE,
  TRANSACTION_PAGE,
  APPROVE_ACTION_TYPES,
} from '../../models/global-codes';
import { LeaveDetail } from '../../models/leave';
import { LeaveTypeService } from '../../services/leave-type.service';
import { WorkflowActionService } from '../../services/workflow-action.service';
import { EL_ADMIN, MEDICAL_ADMIN } from '../../../admin/model/global-code';

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
    this.initForm()
    this.actions = this.getActions()
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
      addressee: '',
      leave_application_id: this.data.leave.id
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return 
    let formValue = this.actionForm.value

    if(this.workflow_action.value == LEAVE_RECOMMENDED) {
      if(this.isEarnedLeave) formValue.addressee = EL_ADMIN
      if(this.isMedicalLeave) formValue.addressee = MEDICAL_ADMIN 
    }

    this.wActionService.processLeave(formValue)
      .subscribe((result) =>  {
        this.dialogRef.close("processed")
        this.snackbar.open("Successfully processed the leave request", "Dismiss", {
          duration: 1600
        }) 
      })  
  }

  getActions() {
    //check if leave request page
    if(this.data.pageNo != LEAVE_REQUEST_PAGE) {
      //Only callback acion option
      return CALLBACK_ACTION_TYPES
    }
    else {  
      if(this.isEarnedLeave || this.isMedicalLeave) { 
        //check if EL or ML has been already recommended
        if(this.data.leave.status == LEAVE_RECOMMENDED) {
          return APPROVE_ACTION_TYPES
        }
        //check if EL or ML has not been recommended yet
        return EL_ML_ACTION_TYPES
      }
      
      return this.actions = PROCESS_ACTION_TYPES
    }
  }

  get addressee() {
    return this.actionForm.get('addressee')
  }

  get workflow_action() {
    return this.actionForm.get('workflow_action')
  }

  get isEarnedLeave(): boolean {
    let el_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == EL_CODE)
    return el_type ? true : false  
  }

  get isMedicalLeave(): boolean {
    let ml_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    return ml_type ? true : false  
  }

  getOfficerName(officer) {
    return `${officer.first_name} ${officer.last_name}, ${officer.designation}`
  }
}