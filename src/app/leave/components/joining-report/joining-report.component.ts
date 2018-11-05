import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { Addressee } from '../../models/adressee';
import { JR_CALLBACK_ACTION_TYPES, JR_CALLBACKED, JR_PENDING } from '../../models/leave.codes';
import { LeaveCtrlOfficerService } from '../../services/leave-ctrl-officer.service';
import { EL_HPL_ADMIN, HR_LEAVE_SUPER_ADMIN } from './../../../shared/models/global-codes';
import { JoiningReport, LeaveJoiningReport } from './../../models/joining-report';
import {
  JR_ACCEPT_ACTION_TYPES,
  JR_ACCEPTED,
  JR_RECOMMEND_ACTION_TYPES,
  JR_RECOMMENDED,
  JR_SUBMITTED,
} from './../../models/leave.codes';
import { JoiningReportService } from './../../services/joining-report.service';
import { LeaveTypeService } from './../../services/leave-type.service';

@Component({
  selector: 'app-joining-report',
  templateUrl: './joining-report.component.html',
  styleUrls: ['./joining-report.component.scss']
})
export class JoiningReportComponent implements OnInit {
  joiningReportForm: FormGroup
  ctrlOfficers: Addressee[] = []
  actions = []
  sessions = [
    { name: 'Forenoon', code: 'AM' },
    { name: 'Afternoon', code: 'PM' }
  ]
  step: number = 1
  subscription: Subscription

  //Joining report status codes
  jr_recommended = JR_RECOMMENDED

  constructor(
    public dialogRef: MatDialogRef<JoiningReportComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
    private leaveCtrlOfficer: LeaveCtrlOfficerService,
    private joiningReportService: JoiningReportService,
    public leaveType: LeaveTypeService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: LeaveJoiningReport
  ) { }

  ngOnInit() {
    // console.log(this.data)
    this.initForm()

    let leaveRoleMapper = false;
    if(this.auth.currentUser.emp_code != this.data.emp_code) {
      leaveRoleMapper = true;
    }

    this.leaveCtrlOfficer.getLeaveCtrlOfficers(this.auth.currentUser.emp_code, this.data.leaveDetails, leaveRoleMapper)
      .subscribe((ctrlOfficers: Addressee[]) => {
        this.ctrlOfficers = ctrlOfficers
      })

    if (this.isPending() || this.isCallbacked()) {
      this.addressee.setValidators(Validators.required)
    }

    if (this.isSubmitted()) {
      this.actions = JR_RECOMMEND_ACTION_TYPES
    }

    //if joining report is submitted or is recommended and the joining letter belongs 
    //to the current user, he can callback the joining letter
    if((this.isSubmitted() || this.isRecommended()) && this.auth.currentUser.emp_code == this.data.emp_code) {
      this.actions = JR_CALLBACK_ACTION_TYPES
    }

    //if joining report is recommended and joining letter does not belong to the current user
    if (this.isRecommended() && this.auth.currentUser.emp_code != this.data.emp_code) {
      let jr_addressee = this.data.joiningReport.addressee
      console.log("Im here")
      //if current user is EL_HPL admin or super hr leave admin and joining letter is addressed 
      //to either one of them then the current user can accept/approve the joining letter
      if ((this.auth.isElHplAdmin() || this.auth.isHrLeaveSuperAdmin()) &&
        (jr_addressee == EL_HPL_ADMIN || jr_addressee == HR_LEAVE_SUPER_ADMIN)) {
        this.actions = JR_ACCEPT_ACTION_TYPES
      } 
      else {
        //else the current user can only recommend the joining letter to HR leave sanction officer
        this.actions = JR_RECOMMEND_ACTION_TYPES
      }
    }

    this.subscription = this.status.valueChanges
      .subscribe((data) => {
        if (data == JR_RECOMMENDED) {
          this.addressee.setValidators(Validators.required)
        }
      })
  }

  initForm() {
    let joiningReport = this.data.joiningReport
    //initialize joining report form
    this.joiningReportForm = this.fb.group({
      joining_date: [joiningReport.joining_date, Validators.required],
      session: [joiningReport.session, Validators.required],
      comment: [joiningReport.comment, Validators.required],
      status: [(this.isPending() || this.isCallbacked()) ? JR_SUBMITTED : '', Validators.required],
      addressee: ''
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  onSubmit() {
    console.log(this.joiningReportForm.value)
    if (this.joiningReportForm.invalid) return

    let joiningReport: JoiningReport = this.joiningReportForm.value
    console.log(joiningReport)
    
    this.joiningReportService.updateJoiningReport(this.data.id, joiningReport)
      .subscribe((result) => {
        console.log(result)
        this.dialogRef.close("success")
        this.snackbar.open("Successfully submitted the joining letter", "Dismiss", {
          duration: 1600
        })
      })
  }

  get joining_date() {
    return this.joiningReportForm.get('joining_date')
  }

  get session() {
    return this.joiningReportForm.get('session')
  }

  get comment() {
    return this.joiningReportForm.get('comment')
  }

  get addressee() {
    return this.joiningReportForm.get('addressee')
  }

  get status() {
    return this.joiningReportForm.get('status')
  }

  isSubmitted() {
    return this.data.joiningReport.status == JR_SUBMITTED
  }

  isPending() {
    return this.data.joiningReport.status == JR_PENDING
  }

  isRecommended() {
    return this.data.joiningReport.status == JR_RECOMMENDED
  }

  isAccepted() {
    return this.data.joiningReport.status == JR_ACCEPTED
  }

  isCallbacked() {
    return this.data.joiningReport.status == JR_CALLBACKED
  }

  getSessionType(code) {
    return this.sessions.find(session => session.code == code).name
  }
}