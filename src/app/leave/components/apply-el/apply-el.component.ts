import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { HierarchyService } from '../../../hierarchy/services/hierarchy.service';
import { LedgerService } from '../../services/ledger.service';
import { LeaveStatus, LeaveAppForm } from '../../models/leave';
import { EL_CODE } from '../../models/global-codes';

@Component({
  selector: 'app-apply-el',
  templateUrl: './apply-el.component.html',
  styleUrls: ['./apply-el.component.scss']
})
export class ApplyElComponent implements OnInit {
  leaveForm: FormGroup
  leaveStatuses: LeaveStatus[] = []
  ctrlOfficers = [];
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
  ) { }

  ngOnInit() {
    this.ledgerService.getLeaveStatus(this.authService.currentUser.emp_code, '2018')
      .subscribe((status: LeaveStatus[]) => {
        this.leaveStatuses = status
      })  

    this.hierarchyService.getParents(this.authService.currentUser.emp_code)
      .subscribe((ctrlOfficers: any[]) => {
        this.ctrlOfficers = ctrlOfficers
      })

    this.initializeForm()
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      officer_emp_code: ['', Validators.required],
      purpose: ['', Validators.required],
      address: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      station_leave: false,
      prefix_from: '',
      prefix_to: '',
      suffix_from: '',
      suffix_to: ''
    })
  }

  applyLeave() {
    // if(this.leaveForm.invalid) return

    let leave_detail = [{
      from_date: this.from_date.value,
      to_date: this.to_date.value,
      leave_type: EL_CODE,
      station_leave: this.station_leave.value
    }]
    var date1 = new Date("11/7/2010");
    var date2 = new Date("12/8/2010");
    var diffDays = date2.valueOf() - date1.valueOf();

    alert(diffDays / (1000 * 60 * 60 * 24))

    let leavApplication: LeaveAppForm = Object.assign(this.leaveForm.value, 
      { leave_details: leave_detail, emp_code: this.authService.currentUser.emp_code });

    console.log(leavApplication)  
  }


  get officer_emp_code() {
    return this.leaveForm.get('officer_emp_code')
  }
  
  get purpose() {
    return this.leaveForm.get('purpose')
  }

  get contact_no() {
    return this.leaveForm.get('contact_no')
  }

  get address() {
    return this.leaveForm.get('address')
  }

  get from_date() {
    return this.leaveForm.get('from_date')
  }

  get to_date() {
    return this.leaveForm.get('to_date')
  }

  get station_leave() {
    return this.leaveForm.get('station_leave')
  }
}
