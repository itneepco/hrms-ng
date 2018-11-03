import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../auth/services/auth.service';
import { Addressee } from '../../models/adressee';
import { LeaveCtrlOfficerService } from '../../services/leave-ctrl-officer.service';
import { LeaveJoiningReport } from './../../models/joining-report';
import { LeaveTypeService } from './../../services/leave-type.service';

@Component({
  selector: 'app-joining-report',
  templateUrl: './joining-report.component.html',
  styleUrls: ['./joining-report.component.scss']
})
export class JoiningReportComponent implements OnInit {
  joiningReportForm: FormGroup
  ctrlOfficers: Addressee[] = []
  sessions = [
    {name: 'Forenoon', code: 'PM'}, 
    {name: 'Afternoon', code: 'AM'}
  ]

  constructor(
    public dialogRef: MatDialogRef<JoiningReportComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
    private leaveCtrlOfficer: LeaveCtrlOfficerService,
    public leaveType: LeaveTypeService,
    @Inject(MAT_DIALOG_DATA) public data: LeaveJoiningReport 
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.initForm()

    this.leaveCtrlOfficer.getLeaveCtrlOfficers(this.auth.currentUser.emp_code, this.data.leaveDetails)
      .subscribe((ctrlOfficers: Addressee[]) => {
        this.ctrlOfficers = ctrlOfficers
        // console.log(ctrlOfficers)
      })
  }

  initForm() {
    this.joiningReportForm = this.fb.group({
      joining_date: ['', Validators.required],
      status: ['', Validators.required],
      session: ['', Validators.required],
      comment: ['', Validators.required],
      addressee: ['', Validators.required],
    })
  }

  ngOnSubmit() {

  }

}
