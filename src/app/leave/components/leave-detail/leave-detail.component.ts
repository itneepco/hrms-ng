import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { HierarchyService } from '../../../admin/services/hierarchy.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CL_CODE, EL_CODE, HPL_CODE, RH_CODE, EL_HPL_ADMIN } from '../../../shared/models/global-codes';
import { LeaveDetail, LeaveStatus } from '../../../shared/models/leave';
import {
  APPROVE_ACTION_TYPES,
  CALLBACK_ACTION_TYPES,
  CANCEL_ACTION_TYPES,
  EL_ML_ACTION_TYPES,
  LEAVE_APPLIED,
  LEAVE_APPROVED,
  LEAVE_CALLBACKED,
  LEAVE_CANCELLED,
  LEAVE_NOT_RECOMMENDED,
  LEAVE_PROCESSED_PAGE,
  LEAVE_RECOMMENDED,
  LEAVE_REQUEST_PAGE,
  PROCESS_ACTION_TYPES,
  TRANSACTION_PAGE,
} from '../../models/leave.codes';
import { LeaveTypeService } from '../../services/leave-type.service';
import { LedgerService } from '../../services/ledger.service';
import { WorkflowActionService } from '../../services/workflow-action.service';
import { HD_CL_CODE, HR_LEAVE_SUPER_ADMIN } from './../../../shared/models/global-codes';
import { Addressee, CtrlOfficer } from './../../models/adressee';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit, OnDestroy {
  panelOpenState = false
  displayedColumns = ["position", "leave_type", "station_leave", "from_date", "to_date"]
  leaveDetailSource: MatTableDataSource<LeaveDetail>
  step: number = 0
  actionForm: FormGroup
  actions = []
  l_app_addressees: Addressee[] = []
  leaveStatuses: LeaveStatus[] = []
  subscription: Subscription

  //GLobal codes
  cl_code = CL_CODE
  hdcl_code = HD_CL_CODE
  rh_code = RH_CODE
  leave_applied = LEAVE_APPLIED
  leave_recommended_code = LEAVE_RECOMMENDED
  leave_approved_code = LEAVE_APPROVED
  leave_callback_code = LEAVE_CALLBACKED
  leave_cancelled = LEAVE_CANCELLED

  //Page code
  transactionPage = TRANSACTION_PAGE
  leaveProcessedPage = LEAVE_PROCESSED_PAGE

  constructor(
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    public lTypeService: LeaveTypeService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public wActionService: WorkflowActionService,
    private ledgerService: LedgerService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LeaveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.leaveDetailSource = new MatTableDataSource(this.data.leave.leaveDetails)
    this.initForm()
    this.actions = this.getActions()

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe((ctrlOfficers: CtrlOfficer[]) => {
        this.setCtrlOfficers(ctrlOfficers)
      })
    
    this.ledgerService.getLeaveStatus(this.data.leave.emp_code)
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
        console.log(status)
      })
    
    this.subscription = this.workflow_action.valueChanges
      .subscribe((data) => {
        if(data == LEAVE_RECOMMENDED) {
          this.addressee.setValidators(Validators.required)
        }
      })
  }

  setStep(index: number) {
    this.step = index;
  }

  initForm() {
    this.actionForm = this.fb.group({
      workflow_action: ['', Validators.required],
      remarks: '',
      addressee: '',
      officer_emp_code: this.data.pageNo == this.transactionPage ? null : this.authService.currentUser.emp_code,
      leave_application_id: this.data.leave.id
    })
  }

  onSubmit() {
    if(this.actionForm.invalid) return 
    let formValue = this.actionForm.value

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
    if(this.data.pageNo == LEAVE_REQUEST_PAGE) {
      if(this.isEarnedLeave || this.isHalfPayLeave) { 
        //check if EL or ML has been already recommended and forwarded to EL HPL Admin
        if(this.data.leave.status == LEAVE_RECOMMENDED && 
            (this.auth.isElHplAdmin() || this.auth.isHrLeaveSuperAdmin())) {
          return APPROVE_ACTION_TYPES
        }
        //check if EL or ML has not been recommended yet
        return EL_ML_ACTION_TYPES
      }
      
      return PROCESS_ACTION_TYPES
    }
    else {  
      //If leave is approved then controlling officer can cancel the leave application from 
      //from leave processed page
      if(this.data.leave.status == LEAVE_APPROVED && this.data.pageNo == LEAVE_PROCESSED_PAGE) {
        return CANCEL_ACTION_TYPES
      } 
      //if leave is applied, recommended or not recommended, the leave application can be callbacked
      else if(this.data.leave.status == LEAVE_APPLIED || this.data.leave.status == LEAVE_RECOMMENDED || this.data.leave.status == LEAVE_NOT_RECOMMENDED) {
        return CALLBACK_ACTION_TYPES
      }
      //else actions will be empty
      else {
        return []
      }
    }
  }

  setCtrlOfficers(ctrlOfficers: CtrlOfficer[]) {
    ctrlOfficers.forEach(officer => {
      this.l_app_addressees.push({
        name: this.getOfficerName(officer),
        code: officer.emp_code
      })
    })

    if(this.isEarnedLeave || this.isHalfPayLeave) {
      let el_hpl_site_admin = { name: "Project Leave Sanction Officer", code: EL_HPL_ADMIN }
      let el_hpl_corporate_admin = { name: "Corporate Leave Sanction Officer", code: HR_LEAVE_SUPER_ADMIN }
  
      this.l_app_addressees.push(el_hpl_site_admin)
      this.l_app_addressees.push(el_hpl_corporate_admin)
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

  get isHalfPayLeave(): boolean {
    let ml_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == HPL_CODE)
    return ml_type ? true : false  
  }

  get isCasualLeave(): boolean {
    let el_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == CL_CODE)
    return el_type ? true : false  
  }

  get isRestrictedHoliday(): boolean {
    let el_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == RH_CODE)
    return el_type ? true : false  
  }

  get isHalfDayCl(): boolean {
    let el_type = this.data.leave.leaveDetails
      .find(leaveDetail => leaveDetail.leave_type == HD_CL_CODE)
    return el_type ? true : false  
  }

  // checkBalance() {
  //   if(this.isCasualLeave || this.isHalfDayCl || this.isRestrictedHoliday) {
  //     let no_of_cl = this.data.leave.leaveDetails
  //       .filter(leaveDetail => leaveDetail.leave_type == CL_CODE).length
  //     let no_of_rh = this.data.leave.leaveDetails
  //       .filter(leaveDetail => leaveDetail.leave_type == RH_CODE).length
  //     let no_of_hdcl = this.data.leave.leaveDetails
  //       .filter(leaveDetail => leaveDetail.leave_type == HD_CL_CODE).length
  //   }

  //   if(this.isEarnedLeave) {
  //     let el = this.data.leave.leaveDetails[0]
  //     // let no_of_el = el.from_date
  //   }
  // }

  getOfficerName(officer) {
    return `${officer.first_name} ${officer.last_name}, ${officer.designation}`
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}