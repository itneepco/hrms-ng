import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HierarchyService } from '../../../admin/services/hierarchy.service';
import { AuthService } from '../../../auth/services/auth.service';
import { EL_CODE, HPL_CODE } from '../../models/global-codes';
import { LeaveAppForm, LeaveStatus } from '../../models/leave';
import { LeaveService } from '../../services/leave.service';
import { LedgerService } from '../../services/ledger.service';
import { DateValidator } from '../../validators/date-validator';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit , OnDestroy {
  leaveForm: FormGroup
  leaveStatuses: LeaveStatus[] = []
  ctrlOfficers = []
  code: string
  el_code = EL_CODE
  hpl_code = HPL_CODE
  subscription: Subscription
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private hierarchyService: HierarchyService,
    private ledgerService: LedgerService,
    private leaveService: LeaveService,
    private router: Router,
    private route: ActivatedRoute
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
    
    this.subscription = this.route.params.subscribe(params => {
      this.code = params['id'];
    });  

    this.initializeForm()
    this.leaveForm.valueChanges.subscribe(data => console.log(data))
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
    }, 
    { validator: [
      DateValidator.fromToDateValidator,
      DateValidator.prefFromToValidator,
      DateValidator.suffFromToValidator]
    })
  }

  applyLeave() {
    if(this.leaveForm.invalid) return

    let leave_detail = [{
      from_date: this.from_date.value,
      to_date: this.to_date.value,
      leave_type: this.code == this.hpl_code ? HPL_CODE : EL_CODE,
      station_leave: this.station_leave.value
    }]

    let leavApplication: LeaveAppForm = Object.assign(this.leaveForm.value, 
      { leave_details: leave_detail, emp_code: this.authService.currentUser.emp_code });

    console.log(leavApplication)
    this.leaveService.applyLeave(leavApplication).subscribe(result => { 
      console.log(result)
      this.router.navigateByUrl('leave/leave-transaction')
    })  
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
